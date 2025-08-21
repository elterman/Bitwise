<script>
    let open = $state(true);

    const onClick = () => {
        open = !open;
    };
</script>

<div class="reference">
    <div class="panel" onpointerdown={onClick}>
        <span class="header">BITWISE OPERATOR REFERENCE</span>
        <span class="chevron {open ? 'flipped' : ''}"></span>
    </div>
    <div class="table-container {open ? 'open' : ''}">
        <div class="table">
            <div class="cell" style="grid-area: 1/1"></div>
            <div class="cell" style="grid-area: 1/2"></div>
            <div class="cell" style="grid-area: 1/3"></div>
            <div class="cell" style="grid-area: 1/4"></div>
            <div class="cell" style="grid-area: 1/5"></div>
            <div class="cell" style="grid-area: 2/1"></div>
            <div class="cell" style="grid-area: 2/2"></div>
            <div class="cell" style="grid-area: 2/3"></div>
            <div class="cell" style="grid-area: 2/4"></div>
            <div class="cell" style="grid-area: 2/5"></div>
            <div class="cell" style="grid-area: 3/1"></div>
            <div class="cell" style="grid-area: 3/2"></div>
            <div class="cell" style="grid-area: 3/3"></div>
            <div class="cell" style="grid-area: 3/4"></div>
            <div class="cell" style="grid-area: 3/5"></div>
            <div class="cell" style="grid-area: 4/1"></div>
            <div class="cell" style="grid-area: 4/2"></div>
            <div class="cell" style="grid-area: 4/3"></div>
            <div class="cell" style="grid-area: 4/4"></div>
            <div class="cell" style="grid-area: 4/5"></div>
            <div class="cell" style="grid-area: 5/1"></div>
            <div class="cell" style="grid-area: 5/2"></div>
            <div class="cell" style="grid-area: 5/3"></div>
            <div class="cell" style="grid-area: 5/4"></div>
            <div class="cell" style="grid-area: 5/5"></div>
        </div>
    </div>
</div>

<style>
    .reference {
        display: grid;
        gap: 5px;
    }

    .panel {
        display: grid;
        grid-auto-flow: column;
        place-content: start;
        gap: 20px;
        font-family: UI;
        cursor: pointer;
    }

    .panel:hover {
        color: white;
    }

    .chevron {
        place-self: center;
        /* margin-left: 120px; */

        --s: 4px; /* control the shape (can be percentage) */
        width: 16px;
        aspect-ratio: 5/3;
        clip-path: polygon(0 0, 0 var(--s), 50% 100%, 100% var(--s), 100% 0, 50% calc(100% - var(--s)));
        background: var(--offwhite);
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
</style>
