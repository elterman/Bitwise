<script>
    import Arrow from '$lib/images/Back.webp';
    import { OP_AND, OP_OR, OP_XOR, OPP_FRIEND } from './const';
    import Operator from './Operator.svelte';
    import { ss } from './state.svelte';
</script>

<div class="operators">
    <div class="labels">
        <div class="label">
            <span>Operators</span>
            <img
                class="arrow {!ss.over && !ss.started && (ss.opp === OPP_FRIEND || ss.turn === 1) ? 'pulse' : ''}"
                src={Arrow}
                alt=""
                width={28} />
        </div>
        <div class="label">
            <span>Results</span>
            <img class="arrow" src={Arrow} alt="" width={28} />
        </div>
    </div>
    <Operator op={OP_AND} />
    <Operator op={OP_OR} />
    <Operator op={OP_XOR} />
</div>

<style>
    .operators {
        grid-area: 4/1;
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        gap: 30px;
        filter: drop-shadow(0 0 3px #00000080);
    }

    .labels {
        display: grid;
        font-family: UI;
    }

    .label {
        display: grid;
        gap: 5px;
        grid: auto / 80px auto;
        grid-auto-flow: column;
        align-items: center;
        text-align: end;
        color: var(--blue);
    }

    .arrow {
        scale: -1 1;
        opacity: 0.6;
    }

    .pulse {
        animation: pulse 0.5s alternate infinite ease-in-out;
        animation-delay: 0.8s;
    }

    @keyframes pulse {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-30%);
        }
    }
</style>
