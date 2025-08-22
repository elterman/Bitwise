<script>
    import { sample } from 'lodash-es';
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

    const b1 = sample([true, false]);
    const b2 = sample([true, false]);
    const size = 14;
</script>

<div class="op {op === ss.op ? 'selected' : ss.op || op === ss.last_op ? 'disabled' : ''}" onpointerdown={onOpSelect}>
    <div>{op}</div>
    <div class="output">
        <XO x={b1} {size} />
        {#if ss.bits === 2}
            <XO x={b2} {size} />
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
