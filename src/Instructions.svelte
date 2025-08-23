<script>
    import { ss } from './state.svelte';
</script>

<div class="instr {ss.turn === 1 ? 'y' : 'b'}">
    Combine the two inputs from the queue by applying an available operator above. The selected operator will become unavailable on the next turn.
</div>

<style>
    .instr {
        grid-area: 5/1;
        place-self: center;
        display: grid;
        font-family: UI;
        font-size: 15.6px;
        filter: drop-shadow(0 0 3px #00000080);
        transition: color 1s;
    }

    .y {
        color: var(--lightyellow);
    }

    .b {
        color: var(--blue);
    }
</style>
