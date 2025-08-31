<script>
    import NumberFlow, { NumberFlowGroup } from '@number-flow/svelte';
    import { _stats } from './state.svelte';

    const ave = (points) => _stats.plays ? Math.round(points / _stats.plays) : 0;
</script>

<div class="stats">
    <div class="item">
        <span class="label">PLAYS</span>
        <NumberFlowGroup>
            <div class="flow" style=" --number-flow-mask-height: 0em;">
                <NumberFlow value={_stats.won} style="margin-right: -2px;" />
                <NumberFlow prefix=":" value={_stats.plays - _stats.won} />
            </div>
        </NumberFlowGroup>
    </div>
    <div class="item">
        <span class="label">AVE. SCORE</span>
        <NumberFlowGroup>
            <div class="flow" style=" --number-flow-mask-height: 0em;">
                <NumberFlow value={ave(_stats.total_points[0], _stats.won)} style="margin-right: -2px;" />
                <NumberFlow prefix=":" value={ave(_stats.total_points[1], _stats.plays - _stats.won)} />
            </div>
        </NumberFlowGroup>
    </div>
</div>

<style>
    .stats {
        grid-area: 1/1;
        display: grid;
        grid-auto-flow: column;
        padding: 5px 20px 3px;
        place-self: center;
        place-content: center;
        gap: 20px;
        border-radius: 50vh;
        color: var(--sn);
        font-family: UI;
        filter: drop-shadow(0 0 3px #00000080);
    }

    .item {
        box-sizing: border-box;
        font-size: 14px;
        border-radius: 50vh;
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        align-items: center;
        place-content: center;
    }

    .label {
        color: var(--gray);
    }
</style>
