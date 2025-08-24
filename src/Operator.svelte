<script>
    import { QUEUE_SIZE } from './const';
    import { fn, newBits, valueColor } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { post } from './utils';
    import XO from './XO.svelte';

    const { op } = $props();
    let output = $derived(fn(op));
    let pressed = $state(false);
    let timer = $state(false);
    let _op = $state();

    const onClick = () => {
        _sound.play('tap');
        ss.op = op;

        const score = [...ss.score];

        if (ss.bits === 1) {
            ss.score[output[0] === 1 ? 0 : 1] += 1;
        } else {
            if (output[0] === 1 && output[1] === 0) {
                ss.score[0] += 1;
            } else if (output[0] === 0 && output[1] === 1) {
                ss.score[1] += 1;
            }
        }

        const keepTurn = false;

        if (keepTurn && ss.score[0] > score[0]) {
            ss.turn = 1;
        } else if (keepTurn && ss.score[1] > score[1]) {
            ss.turn = 2;
        } else {
            ss.turn = 3 - ss.turn;
        }

        ss.new = newBits();

        post(() => {
            _sound.play('cluck');
            const que = [...ss.queue];
            que.unshift(ss.new);
            que.splice(QUEUE_SIZE - 1, 2, output);
            ss.queue = que;
            ss.last_op = op;

            delete ss.new;
            delete ss.op;
        }, 750);
    };

    $effect(() => {
        const onTransitionEnd = () => {
            if (pressed) {
                pressed = false;
            } else {
                post(onClick);
            }
        };

        _op.addEventListener('transitionend', onTransitionEnd);
        return () => _op.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => {
        if (timer) {
            return;
        }

        pressed = true;
        timer = post(() => (timer = null), 500);
    };

    const size = 14;
    const disabled = $derived(ss.op || op === ss.last_op);
</script>

<div class="op {op === ss.op ? 'selected' : disabled ? 'disabled' : ''}" onpointerdown={onPointerDown}>
    <div bind:this={_op} class="name {pressed ? 'pressed' : ''}">{op}</div>
    <div class="bits {valueColor(output)}">
        <XO x={output[0]} {size} />
        {#if ss.bits === 2}
            <XO x={output[1]} {size} />
        {/if}
    </div>
</div>

<style>
    .op {
        display: grid;
        justify-items: center;
        cursor: pointer;
        transition: color 0.2s;
        font-family: Title;
        font-weight: bold;
        font-size: 20px;
    }

    .op:hover {
        color: white;
        text-decoration: overline;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.35;
    }

    .selected {
        text-decoration: overline;
        pointer-events: none;
        color: white;
    }

    .bits {
        display: grid;
        grid-auto-flow: column;
        gap: 5px;
        padding: 4px 6px;
    }

    .name {
        transition: scale 0.1s;
    }

    .pressed {
        scale: 0.8;
    }
</style>
