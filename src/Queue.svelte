<script>
    import Arrow from '$lib/images/Back.webp';
    import Cell from './Cell.svelte';
    import { QUEUE_SIZE } from './const';
    import { ss } from './state.svelte';

    const grid = `repeat(${QUEUE_SIZE}, 46px) / auto;`;
</script>

<div class="queue" style="grid: {grid}">
    {#each ss.queue as bits, index (index + Date.now())}
        <Cell {bits} {index} />
    {/each}
    <div class="label" style="grid-area: {QUEUE_SIZE - 1} / 1">
        <span>Input A</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
    <div class="label" style="grid-area: {QUEUE_SIZE} / 1">
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

    .label {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        font-family: UI;
        filter: drop-shadow(0 0 3px #00000080);
        transform: translateX(-96px);
        color: var(--blue);
    }

    .arrow {
        transform: scaleX(-1);
        opacity: 0.6;
        filter: drop-shadow(0 0 3px #00000080);
    }
</style>
