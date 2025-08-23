<script>
    import Arrow from '$lib/images/Back.webp';
    import { fly } from 'svelte/transition';
    import Cell from './Cell.svelte';
    import { QUEUE_SIZE } from './const';
    import { ss } from './state.svelte';
    import { linear } from 'svelte/easing';
    import { fn, valueColor, xoSize } from './shared.svelte';
    import XO from './XO.svelte';

    const grid = `repeat(${QUEUE_SIZE}, 46px)/auto;`;
</script>

<div class="queue" style="grid: {grid}">
    {#each ss.queue as bits, index (index + Date.now())}
        <Cell {bits} {index} />
    {/each}
    <div class="label" style="grid-area: {QUEUE_SIZE - 1}/1">
        <span>Input A</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
    <div class="label" style="grid-area: {QUEUE_SIZE}/1">
        <span>Input B</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
    {#if ss.new}
        {@const output = fn(ss.op)}
        {@const classes = `cell ${ss.bits === 2 ? 'double-cell' : ''} ${valueColor(output)}`}
        {@const params = { x: 95, opacity: 1, duration: 350, easing: linear }}
        {@const size = xoSize()}
        {@const filter = 'invert(0.25)'}
        <div class={classes} style="grid-area: {QUEUE_SIZE}/1" in:fly={params}>
            <XO x={output[0]} {size} {filter} />
            {#if ss.bits === 2}
                <XO x={output[1]} {size} {filter} />
            {/if}
        </div>
    {/if}
</div>

<style>
    .queue {
        grid-area: 1/2;
        place-self: end center;
        display: grid;
        box-sizing: border-box;
        width: 95px;
        overflow: hidden;
    }

    .label {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        font-family: UI;
        filter: drop-shadow(0 0 3px #00000080);
        transform: translateX(-102px);
        color: var(--blue);
    }

    .arrow {
        transform: scaleX(-1);
        opacity: 0.6;
        filter: drop-shadow(0 0 3px #00000080);
    }

    .cell {
        box-sizing: border-box;
        border: solid #00000080;
        border-width: 0 0 1px;
        display: grid;
        grid-auto-flow: column;
        place-content: center;
        align-items: center;
    }

    .double-cell {
        grid: auto / 1fr 1fr;
        padding: 0 6px;
    }
</style>
