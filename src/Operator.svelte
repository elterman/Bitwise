<script>
    import { sample } from 'lodash-es';
    import { O, X } from './const';
    import { ss } from './state.svelte';
    import { post } from './utils';

    const { op } = $props();

    const onOpSelect = () => {
        ss.op = op;

        post(() => {
            ss.last_op = op;
            delete ss.op;
        }, 1000);
    };

    const b1 = sample([X, O]);
    const b2 = sample([X, O]);

</script>

<div class="op {op === ss.op ? 'selected' : ss.op || op === ss.last_op ? 'disabled' : ''}" onpointerdown={onOpSelect}>
    <div>{op}</div>
    <div class='output xo'>
        <span class={b1 === X ? 'x' : 'o'} style='margin-right: {ss.bits === 2 ? -3 : 0}px;'>{b1}</span>
        {#if ss.bits === 2}
        <span class={b2 === X ? 'x' : 'o'} style='margin-left: -3px;'>{b2}</span>
        {/if}
    </div>
</div>

<style>
    .op {
        display: grid;
        justify-items: center;
        cursor: pointer;
        transition: color 0.2s;
    }

    .op:hover {
        color: white;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    .selected {
        text-decoration: overline;
        pointer-events: none;
        color: white;
    }

    .output {
        opacity: 0.8;
    }

    .x {
        font-size: 12px;
    }

    .o {
        font-size: 13px;
    }
</style>
