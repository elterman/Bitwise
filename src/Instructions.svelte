<script>
    import { _prompt, ss } from './state.svelte';
</script>

<div class="instr {_prompt.id && !ss.over ? 'hidden' : ''}">
    {#if !_prompt.id}
        Combine the two inputs from the queue by applying an available operator above. The selected operator will become unavailable on the
        next turn.
    {/if}
</div>

<style>
    .instr {
        grid-area: 5/1;
        place-self: center;
        display: grid;
        font-family: UI;
        font-size: 15.6px;
        filter: drop-shadow(0 0 3px #00000080);
        color: var(--blue);
        transition: opacity 0.2s;
    }

    .hidden {
        opacity: 0;
    }
</style>
