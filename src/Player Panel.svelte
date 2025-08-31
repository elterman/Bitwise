<script>
    import Player2 from '$lib/images/Human Blue.webp';
    import Player1 from '$lib/images/Human Yellow.webp';
    import Robot from '$lib/images/Robot.webp';
    import { OPP_AI } from './const';
    import { valueColor } from './shared.svelte';
    import { ss } from './state.svelte';
    import XO from './XO.svelte';

    const { player } = $props();
    const size = 20;

    const onClick = () => {
        ss.turn = player;
    };
</script>

<div class="player-panel {player === 1 ? 'one' : 'two'}">
    <img
        class="player {ss.over ? 'disabled' : ss.turn === player ? 'spin disabled' : ''}"
        src={player === 1 ? Player1 : ss.opp === OPP_AI ? Robot : Player2}
        alt=""
        width={70}
        onpointerdown={onClick} />
    <span class="text">Player {player} scores when the result is</span>
    <div class="bits {valueColor(player === 1 ? [1, 0] : [0, 1])}">
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
        cursor: pointer;
        pointer-events: none;
    }

    .disabled {
        pointer-events: none;
    }

    .one {
        grid-area: 1/1;
    }

    .two {
        grid-area: 1/3;
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
        padding: 8px 10px;
    }

    .spin {
        animation: spin 0.5s alternate infinite linear;
    }

    @keyframes spin {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(90deg);
        }
    }
</style>
