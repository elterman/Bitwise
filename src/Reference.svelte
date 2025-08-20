<script>
    let open = $state(true);

    const onClick = () => {
        open = !open;
    };
</script>

<div class="reference">
    <div class="panel" onpointerdown={onClick}>
        <span class="header">BITWISE OPERATOR REFERENCE</span>
        <span class="chevron {open ? 'open' : ''}"></span>
    </div>
</div>

<style>
    .reference {
        display: grid;
        gap: 5px;
        place-content: start;
    }

    .panel {
        display: grid;
        grid-auto-flow: column;
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
        background: #d0d0d0;
        transition: 0.5s linear;
    }

    .open {
        rotate: 180deg;
    }

    .table {
        display: grid;
    }
</style>
