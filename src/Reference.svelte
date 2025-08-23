<script>
    import { ss } from './state.svelte';
    import XO from './XO.svelte';

    const onClick = () => {
        ss.show_reference = !ss.show_reference;
    };

    const size = 11;
    const filter = 'invert(1) opacity(0.75)';
</script>

<div class="reference">
    <div class="panel" onpointerdown={onClick}>
        <span class="header">BITWISE OPERATOR REFERENCE</span>
        <span class="chevron {ss.show_reference ? 'flipped' : ''}"></span>
    </div>
    <div class="table-container {ss.show_reference ? 'open' : ''}">
        <div class="table">
            <div class="cell input" style="grid-area: 1/1">Input A</div>
            <div class="cell input" style="grid-area: 1/2">Input B</div>
            <div class="cell" style="grid-area: 1/3">AND</div>
            <div class="cell" style="grid-area: 1/4">OR</div>
            <div class="cell" style="grid-area: 1/5">XOR</div>
            <div class="cell input" style="grid-area: 2/1"><XO size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 2/2"><XO size={size} {filter} /></div>
            <div class="cell" style="grid-area: 2/3"><XO size={size} {filter} /></div>
            <div class="cell" style="grid-area: 2/4"><XO size={size} {filter} /></div>
            <div class="cell" style="grid-area: 2/5"><XO size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 3/1"><XO size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 3/2"><XO x size={size} {filter} /></div>
            <div class="cell" style="grid-area: 3/3"><XO size={size} {filter} /></div>
            <div class="cell" style="grid-area: 3/4"><XO x size={size} {filter} /></div>
            <div class="cell" style="grid-area: 3/5"><XO x size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 4/1"><XO x size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 4/2"><XO size={size} {filter} /></div>
            <div class="cell" style="grid-area: 4/3"><XO size={size} {filter} /></div>
            <div class="cell" style="grid-area: 4/4"><XO x size={size} {filter} /></div>
            <div class="cell" style="grid-area: 4/5"><XO x size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 5/1"><XO x size={size} {filter} /></div>
            <div class="cell input" style="grid-area: 5/2"><XO x size={size} {filter} /></div>
            <div class="cell" style="grid-area: 5/3"><XO x size={size} {filter} /></div>
            <div class="cell" style="grid-area: 5/4"><XO x size={size} {filter} /></div>
            <div class="cell" style="grid-area: 5/5"><XO size={size} {filter} /></div>
        </div>
    </div>
</div>

<style>
    .reference {
        display: grid;
        gap: 8px;
        filter: drop-shadow(0 0 3px #00000080);
        color: var(--blue);
    }

    .panel {
        display: grid;
        grid-auto-flow: column;
        place-content: start;
        gap: 20px;
        font-family: UI;
        /* cursor: pointer; */
        pointer-events: none;
    }

    .panel:hover {
        color: white;
    }

    .header {
        font-size: 14px;
    }

    .chevron {
        display: none;
        place-self: center;
        --s: 3px; /* control the shape (can be percentage) */
        width: 14px;
        aspect-ratio: 5/3;
        clip-path: polygon(0 0, 0 var(--s), 50% 100%, 100% var(--s), 100% 0, 50% calc(100% - var(--s)));
        background: var(--off-white);
        transition: 0.3s linear;
    }

    .flipped {
        rotate: 180deg;
    }

    .table-container {
        height: 0px;
        transition: height 0.3s linear;
        overflow: hidden;
    }

    .open {
        height: 120px;
    }

    .table {
        display: grid;
        grid: repeat(5, 1fr) / repeat(5, 1fr);
        border: solid var(--blue);
        border-width: 1px 0 0 1px;
        box-sizing: border-box;
        height: 120px;
    }

    .cell {
        border: solid var(--blue);
        border-width: 0 1px 1px 0;
        box-sizing: border-box;
        display: grid;
        place-content: center;
    }

    .input {
        background: #00000030;
    }
</style>
