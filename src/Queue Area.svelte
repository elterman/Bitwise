<script>
    import PlayerPanel from './Player Panel.svelte';
    import Queue from './Queue.svelte';
    import Score from './Score.svelte';

</script>

<div class="queue-area">
    <PlayerPanel player={1}/>
    <Score/>
    <Queue/>
    <PlayerPanel player={2}/>
</div>

<style>
    .queue-area {
        grid-area: 3/1;
        display: grid;
        grid: auto / auto 1fr auto;
        gap: 10px;
    }
</style>
