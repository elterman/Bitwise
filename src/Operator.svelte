<script>
    import { OPP_AI } from './const';
    import { fn, onClickOp, valueColor } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { post } from './utils';
    import XO from './XO.svelte';

    const { op } = $props();
    const outBits = $derived(fn(op));
    let timer = $state(false);
    let _op = $state();

    $effect(() => {
        const onTransitionEnd = () => {
            if (ss.pressed === op) {
                delete ss.pressed;
            } else {
                post(() => onClickOp(op));
            }
        };

        _op.addEventListener('transitionend', onTransitionEnd);
        return () => _op.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => {
        if (timer) {
            return;
        }

        _sound.play('tap');
        ss.pressed = op;
        timer = post(() => (timer = null), 500);
    };

    const size = 14;
    const disabled = $derived(ss.opp === OPP_AI && ss.turn === 2);
    const muted = $derived(ss.over || ss.op || op === ss.last_op);
</script>

<div
    class="op {op === ss.op || op === ss.robo_op ? 'selected' : muted ? 'muted disabled' : disabled ? 'disabled' : ''}"
    onpointerdown={onPointerDown}>
    <div bind:this={_op} class="name {ss.pressed === op ? 'pressed' : ''}">{op}</div>
    <div class="bits {valueColor(outBits)}">
        <XO x={outBits[0]} {size} />
        <XO x={outBits[1]} {size} />
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

    .disabled,
    .muted {
        pointer-events: none;
    }

    .muted {
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
