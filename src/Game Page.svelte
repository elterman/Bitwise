<script>
    import { onMount } from 'svelte';
    import Instructions from './Instructions.svelte';
    import QueueArea from './Queue Area.svelte';
    import Prompt from './Prompt.svelte';
    import Stats from './Stats.svelte';
    import Toolbar from './Toolbar.svelte';
    import { APP_STATE, GAME_PAGE } from './const';
    import { _sound } from './sound.svelte';
    import { _stats, ss } from './state.svelte';
    import { post } from './utils';
    import Operators from './Operators.svelte';
    import Reference from './Reference.svelte';
    import { fade } from 'svelte/transition';

    onMount(() => {
        const loadGame = () => {
            const json = localStorage.getItem(APP_STATE);
            const job = JSON.parse(json);

            if (job) {
                _stats.plays = job.plays;
                _sound.sfx = job.sfx;
                _sound.music = job.music;
            }
        };

        post(loadGame);
    });
</script>

{#if ss.page === GAME_PAGE}
    <div class="game-page" in:fade>
        <Stats />
        <Reference />
        <QueueArea />
        <Operators />
        <Instructions />
        <Prompt />
        <Toolbar />
    </div>
{/if}

<style>
    .game-page {
        grid-area: 1/1;
        /* place-self: center; */
        display: grid;
        grid: auto auto 1fr auto 60px auto / auto;
        gap: 15px;
        transition: opacity 0.2s;
        width: 100%;
        box-sizing: border-box;
        padding: 25px 35px;
    }
</style>
