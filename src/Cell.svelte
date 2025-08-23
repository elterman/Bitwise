<script>
    import { ss } from './state.svelte';
    import { valueColor } from './shared.svelte';
    import XO from './XO.svelte';
    import { QUEUE_SIZE } from './const';

    const { bits, index } = $props();

    const filter = 'invert(0.25)';
    const size = $derived(ss.show_reference ? 21 : 20);
    const b1 = bits[0];
    const b2 = bits[1];
    const classes = $derived(
        `cell ${ss.bits === 2 ? 'double-cell' : ''} ${index < QUEUE_SIZE - 2 ? 'default-background' : valueColor(bits)}`,
    );
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
    }

    .default-background {
        background: #ffffff60;
    }

    .double-cell {
        grid: auto / 1fr 1fr;
        padding: 0 6px;
    }
</style>
