<script>
    import Player1 from '$lib/images/Human Yellow.webp';
    import Player2 from '$lib/images/Human Blue.webp';
    import Robot from '$lib/images/Robot.webp';
    import { ss } from './state.svelte';
    import { O, OPP_AI, X } from './const';

    const { player } = $props();
</script>

<div class="player-panel">
    <img class="player" src={player === 1 ? Player1 : ss.opp === OPP_AI ? Robot : Player2} alt="" width={70} />
    <span class="text">Player {player} scores when the result is</span>
    {#if player === 1}
        <span class="x">{X}{ss.bits === 1 ? '' : X}</span>
    {:else}
        <span class="o">{O}{ss.bits === 1 ? '' : O}</span>
    {/if}
</div>

<style>
    .player-panel {
        display: grid;
        justify-items: center;
        place-content: start;
        gap: 10px;
    }

    .player {
        place-self: center;
        filter: drop-shadow(0 0 6px #00000070);
    }

    .text {
        text-align: center;
        font-size: 14px;
    }

    .x {
        font-size: 20px;
    }

    .o {
        font-size: 21px;
    }
</style>
