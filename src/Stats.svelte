<script>
    import NumberFlow from '@number-flow/svelte';
    import { _stats } from './state.svelte';

    // const aveSecs = $derived(_stats.won ? Math.round(_stats.total_secs / _stats.won) : 0);
    // const avePoints = $derived(_stats.won ? Math.round(_stats.total_points / _stats.won) : 0);
</script>

<div class="stats">
    <div class="item">
        <span class="label">PLAYS</span>
        <div class="plays">
            <NumberFlow value={_stats.plays} />
        </div>
    </div>
    <div class="item">
        <span class="label">AVE</span>
    </div>
    <div class="item">
        <span class="label">BEST</span>
    </div>
</div>

<style>
    .stats {
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
        /* font-weight: ; */
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

    .plays {
        display: grid;
        grid-auto-flow: column;
        gap: 2px;
        align-items: center;
    }
</style>
