<script>
    import Arrow from '$lib/images/Back.webp';
    import { ss } from './state.svelte';

    const classes = `cell ${ss.bits === 2 ? 'cell2' : ''}`;
</script>

<div class="queue">
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}></div>
    <div class={classes}>
        <span class="input">Input A</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
    <div class={classes}>
        <span class="input">Input B</span>
        <img class="arrow" src={Arrow} alt="" width={28} />
    </div>
</div>

<style>
    .queue {
        justify-self: center;
        display: grid;
        grid: repeat(10, 1fr) / auto;
        border: solid var(--blue);
        border-width: 1px 0 0 1px;
        box-sizing: border-box;
        width: 101px;
    }

    .cell {
        border: solid var(--blue);
        border-width: 0 1px 1px 0;
        box-sizing: border-box;
        display: grid;
        place-content: center;
        align-items: center;
    }

    .cell2 {
        grid: auto / 1fr 1fr;
    }

    .input {
        grid-area: 1/1/1/span 2;
        transform: translateX(-120px);
        font-family: UI;
        filter: drop-shadow(0 0 3px #00000080);
    }

    .arrow {
        grid-area: 1/1/1/span 2;
        transform: translateX(-61px) scaleX(-1);
        opacity: 0.6;
        filter: drop-shadow(0 0 3px #00000080);
    }

    .x {
        background: var(--yellow);
    }
</style>
