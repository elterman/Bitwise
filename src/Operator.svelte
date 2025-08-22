<script>
    import { QUEUE_SIZE } from './const';
    import { ss } from './state.svelte';
    import { post } from './utils';
    import XO from './XO.svelte';

    const { op } = $props();

    const onOpSelect = () => {
        ss.op = op;

        post(() => {
            ss.last_op = op;
            delete ss.op;
        }, 1000);
    };

    const fn = (bits1, bits2) => {
        switch (op) {
            case 'AND':
                return [bits1[0] & bits2[0], bits1[1] & bits2[1]];
            case 'OR':
                return [bits1[0] | bits2[0], bits1[1] | bits2[1]];
            case 'XOR':
                return [bits1[0] ^ bits2[0], bits1[1] ^ bits2[1]];
            default:
                return [0, 0];
        }
    };

    const output = $derived.by(() => fn(ss.queue[QUEUE_SIZE - 1], ss.queue[QUEUE_SIZE - 2]));
    const size = 14;
</script>

<div class="op {op === ss.op ? 'selected' : ss.op || op === ss.last_op ? 'disabled' : ''}" onpointerdown={onOpSelect}>
    <div>{op}</div>
    <div class="output">
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

    .output {
        display: grid;
        grid-auto-flow: column;
        gap: 5px;
    }
</style>
