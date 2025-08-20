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

    const hidden = $derived(ss.page !== GAME_PAGE);
</script>

<div class="game-page {hidden ? 'hidden' : ''}">
    <Stats />
    <div style="font-family: UI;">BITWISE OPERATOR REFERENCE</div>
    <QueueArea />
    <Operators />
    <Instructions />
    <Prompt />
    <Toolbar />
</div>

<style>
    .game-page {
        grid-area: 1/1;
        /* place-self: center; */
        display: grid;
        grid: auto auto 1fr auto 0.2fr auto / auto;
        gap: 20px;
        transition: opacity 0.2s;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 35px;
        /* filter: drop-shadow(0 0 4px black); */
    }

    .hidden {
        opacity: 0;
    }
</style>
