<script>
    import Player2 from '$lib/images/Human Blue.webp';
    import Player1 from '$lib/images/Human Yellow.webp';
    import Robot from '$lib/images/Robot.webp';
    import NumberFlow from '@number-flow/svelte';
    import { OPP_AI } from './const';
    import Cross from './Cross.svelte';
    import Null from './Null.svelte';
    import { ss } from './state.svelte';

    const { player } = $props();
</script>

<div class="player-panel">
    <img class="player" src={player === 1 ? Player1 : ss.opp === OPP_AI ? Robot : Player2} alt="" width={70} />
    <span class="text">Player {player} scores when the result is</span>
    <div class="bits">
        {#if player === 1}
            <Cross />
            {#if ss.bits === 2}
                <Null />
            {/if}
        {:else}
            <Null />
            {#if ss.bits === 2}
                <Cross />
            {/if}
        {/if}
    </div>
    <div class="score"><NumberFlow value={ss.score[player - 1]} /></div>
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
    }

    .bits {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        align-items: center;
    }

    .score {
        font-family: Roboto Mono;
        font-size: 40px;
    }
</style>
