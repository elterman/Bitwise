<script>
    import NumberFlow, { NumberFlowGroup } from '@number-flow/svelte';
    import { ss } from './state.svelte';
</script>

<div class="score">
    <NumberFlowGroup>
        <div class="flow" style=" --number-flow-mask-height: 0em;">
            <NumberFlow value={ss.score[0]} style='margin-right: -2px;'/>
            <NumberFlow prefix=":" value={ss.score[1]} />
        </div>
    </NumberFlowGroup>
</div>

<style>
    .score {
        grid-area: 1/2;
        place-self: start center;
        display: grid;
        font-family: Roboto Mono;
        font-size: 36px;
        font-weight: bold;
        transform: translateY(15px);
        filter: drop-shadow(0 0 5px #00000080);
    }

    .flow {
        display: grid;
        grid-auto-flow: column;
    }
</style>
