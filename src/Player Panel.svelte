<script>
    import Player2 from '$lib/images/Human Blue.webp';
    import Player1 from '$lib/images/Human Yellow.webp';
    import Robot from '$lib/images/Robot.webp';
    import NumberFlow from '@number-flow/svelte';
    import { OPP_AI } from './const';
    import { ss } from './state.svelte';
    import XO from './XO.svelte';

    const { player } = $props();
    const size = 20;
</script>

<div class="player-panel">
    <img class="player" src={player === 1 ? Player1 : ss.opp === OPP_AI ? Robot : Player2} alt="" width={70} />
    <span class="text">Player {player} scores when the output is</span>
    <div class="bits">
        {#if player === 1}
            <XO x {size} />
            {#if ss.bits === 2}
                <XO {size} />
            {/if}
        {:else}
            <XO {size} />
            {#if ss.bits === 2}
                <XO x {size} />
            {/if}
        {/if}
    </div>
    <!-- <div class="score"><NumberFlow value={ss.score[player - 1]} /></div> -->
</div>

<style>
    .player-panel {
        display: grid;
        justify-items: center;
        place-content: start;
        gap: 10px;
        filter: drop-shadow(0 0 6px #00000080);
    }

    .player {
        place-self: center;
    }

    .text {
        text-align: center;
        font-family: UI;
        font-size: 14px;
        color: var(--blue);
    }

    .bits {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        align-items: center;
    }

    .score {
        font-family: Roboto Mono;
        font-weight: bold;
        font-size: 36px;
    }
</style>
