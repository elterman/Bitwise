<script>
    import { ss } from './state.svelte';
    const { cell, index } = $props();

    const classes = `cell ${ss.bits === 2 ? 'double-cell' : ''}`;
</script>

<div class={classes} style='grid-area: {index + 1} / 1'></div>

<style>
    .cell {
        border: solid var(--blue);
        border-width: 0 1px 1px 0;
        box-sizing: border-box;
        display: grid;
        place-content: center;
        align-items: center;
    }

    .double-cell {
        grid: auto / 1fr 1fr;
    }
</style>
