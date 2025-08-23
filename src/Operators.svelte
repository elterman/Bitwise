<script>
    import Arrow from '$lib/images/Back.webp';
    import { OP_AND, OP_OR, OP_XOR } from './const';
    import Operator from './Operator.svelte';
    import { ss } from './state.svelte';
</script>

<div class="operators">
    <div class="labels {ss.turn === 1 ? 'y' : 'b'}">
        <div class="label">
            <span>Operators</span>
            <img class="arrow" src={Arrow} alt="" width={28} />
        </div>
        <div class="label">
            <span>Outputs</span>
            <img class="arrow" src={Arrow} alt="" width={28} />
        </div>
    </div>
    <Operator op={OP_AND} />
    <Operator op={OP_OR} />
    <Operator op={OP_XOR} />
</div>

<style>
    .operators {
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        gap: 30px;
        filter: drop-shadow(0 0 3px #00000080);
    }

    .labels {
        display: grid;
        font-family: UI;
        transition: color 1s;
    }

    .label {
        display: grid;
        gap: 5px;
        grid: auto / 80px auto;
        grid-auto-flow: column;
        align-items: center;
        text-align: end;
    }

    .y {
        color: var(--lightyellow);
    }

    .b {
        color: var(--blue);
    }

    .arrow {
        transform: scaleX(-1);
        opacity: 0.6;
    }
</style>
