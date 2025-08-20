<script>
    import { onMount } from 'svelte';
    import Prompt from './Prompt.svelte';
    import { APP_STATE, GAME_PAGE } from './const';
    import { _sound } from './sound.svelte';
    import { _stats, ss } from './state.svelte';
    import { post } from './utils';
    import Toolbar from './Toolbar.svelte';
    import MovePrompt from './Move Prompt.svelte';
    import Stats from './Stats.svelte';

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
    <Stats/>
    <MovePrompt/>
    <Prompt />
    <Toolbar/>
</div>

<style>
    .game-page {
        grid-area: 1/1;
        place-self: center;
        display: grid;
        gap: 20px;
        width: 100%;
        transition: opacity 0.2s;
    }

    .hidden {
        opacity: 0;
    }
</style>
