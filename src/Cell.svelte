<script>
    import { QUEUE_SIZE } from './const';
    import { xoSize } from './shared.svelte';
    import { ss } from './state.svelte';
    import XO from './XO.svelte';

    const { bits, index } = $props();

    const filter = 'invert(0.25)';
    const size = xoSize();
    const b1 = bits[0];
    const b2 = bits[1];

    const classes = $derived.by(() => {
        const input = index > QUEUE_SIZE - 3;

        let classes = `cell ${ss.bits === 2 ? 'double-cell' : ''} `;

        if (!input) {
            classes += 'default-background ';
        } else if (ss.new) {
            classes += 'shift ';
        }

        return classes;
    });
</script>

<div class={classes} style="grid-area: {index + 1} / 1">
    <XO x={b1} {size} {filter} />
    {#if ss.bits === 2}
        <XO x={b2} {size} {filter} />
    {/if}
</div>

<style>
    .cell {
        box-sizing: border-box;
        border: solid #00000080;
        border-width: 0 0 1px;
        display: grid;
        grid-auto-flow: column;
        place-content: center;
        align-items: center;
        background: #fff8;
        transition: transform 0.35s linear;
    }

    .default-background {
        background: #ffffff60;
    }

    .double-cell {
        grid: auto / 1fr 1fr;
        padding: 0 6px;
    }

    .shift {
        transform: translateX(calc(-100% - 1px));
    }
</style>
