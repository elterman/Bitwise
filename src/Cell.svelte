<script>
    import { ss } from './state.svelte';
    import XO from './XO.svelte';

    const { bits, index } = $props();

    const filter = 'invert(0.25)';
    const size = 20;
    const b1 = bits[0];
    const b2 = bits[1];

    const background = $derived.by(() => {
        if (ss.bits === 1) {
            return b1 ? 'yellow' : 'blue';
        }

        return b1 && b2 ? 'green' : b1 && !b2 ? 'yellow' : b2 && !b1 ? 'blue' : '';
    });

    const classes = $derived(`cell ${ss.bits === 2 ? 'double-cell' : ''} ${background}`);
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
        background: var(--off-white);
    }

    .double-cell {
        grid: auto / 1fr 1fr;
        padding: 0 6px;
    }

    .yellow {
        background: var(--yellow);
    }

    .blue {
        background: var(--blue);
    }

    .green {
        background: var(--green);
    }
</style>
