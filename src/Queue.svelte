<script>
    import Arrow from '$lib/images/Back.webp';
    import { fly } from 'svelte/transition';
    import Cell from './Cell.svelte';
    import { QUEUE_SIZE } from './const';
    import { ss } from './state.svelte';
    import { linear } from 'svelte/easing';
    import { fn, valueColor, xoSize } from './shared.svelte';
    import XO from './XO.svelte';

    const grid = `repeat(${QUEUE_SIZE}, 47px)/auto;`;
</script>

<div class="queue no-overflow" style="grid: {grid}">
    {#each ss.queue as bits, index (index + Date.now())}
        <Cell {bits} {index} />
    {/each}
    {#if ss.new}
        {@const outBits = fn(ss.op)}
        {@const newClasses = 'cell default-background'}
        {@const outputClasses = `cell ${valueColor(outBits)}`}
        {@const duration = 350}
        {@const newParams = { y: '-100%', opacity: 1, duration, delay: duration + 150, easing: linear }}
        {@const outputParams = { x: '100%', opacity: 1, duration: duration + 150, easing: linear }}
        {#snippet cell(classes, params, bits, row)}
            {@const size = xoSize()}
            {@const filter = 'invert(0.25)'}
            <div class={classes} style="grid-area: {row}/1" in:fly={params}>
                <XO x={bits[0]} {size} {filter} />
                <XO x={bits[1]} {size} {filter} />
            </div>
        {/snippet}
        {@render cell(newClasses, newParams, ss.new, 1)}
        {@render cell(outputClasses, outputParams, outBits, QUEUE_SIZE)}
    {/if}
</div>

<div class="queue" style="grid: {grid}">
    <div class="label" style="grid-area: {QUEUE_SIZE - 1}/1">
        <span>Input A</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
    <div class="label" style="grid-area: {QUEUE_SIZE}/1">
        <span>Input B</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
</div>

<style>
    .queue {
        grid-area: 1/2;
        place-self: end center;
        display: grid;
        box-sizing: border-box;
        width: 95px;
    }

    .no-overflow {
        overflow: hidden;
    }

    .label {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        font-family: UI;
        filter: drop-shadow(0 0 3px #00000080);
        transform: translateX(-101px);
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
        grid: auto / 1fr 1fr;
        grid-auto-flow: column;
        place-content: center;
        align-items: center;
        padding: 0 6px;
    }

    .default-background {
        background: #ffffff60;
    }
</style>
