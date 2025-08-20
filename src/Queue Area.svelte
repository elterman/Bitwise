<script>
    import PlayerPanel from './Player Panel.svelte';
    import Queue from './Queue.svelte';

</script>

<div class="queue-area">
    <PlayerPanel player={1}/>
    <Queue/>
    <PlayerPanel player={2}/>
</div>

<style>
    .queue-area {
        display: grid;
        grid: auto / auto 1fr auto;
    }
</style>
