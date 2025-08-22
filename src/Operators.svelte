<script>
    import Arrow from '$lib/images/Back.webp';
    import { OP_AND, OP_OR, OP_XOR } from './const';
    import Operator from './Operator.svelte';
</script>

<div class="operators">
    <div class="labels">
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
        transform: scaleX(-1);
        opacity: 0.6;
    }
</style>
