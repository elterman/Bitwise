<script>
    import { random, sample } from 'lodash-es';
    import { fade } from 'svelte/transition';
    import { GAME_PAGE, OP_AND, OP_OR, OP_XOR, OPP_AI, OPP_FRIEND, QUEUE_SIZE, START_PAGE } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { _sound } from './sound.svelte';
    import { _stats, ss } from './state.svelte';
    import { range } from './utils';
    import { newBits } from './shared.svelte';
    import OppAI from '$lib/images/Opponent AI.webp';
    import OppFriend from '$lib/images/Opponent Friend.webp';

    const loadGame = () => {
        const json = localStorage.getItem(ss.appKey());
        const job = JSON.parse(json);

        if (job) {
            _sound.sfx = job.sfx;
            _sound.music = job.music;

            _stats.plays = job.plays;

            ss.queue = job.queue;
            ss.score = job.score;
            ss.turn = job.turn;
            ss.who_started = job.who_started;
            ss.last_op = job.last_op;

            return true;
        }

        return false;
    };

    const onPlay = (opp) => {
        ss.opp = opp;

        if (loadGame()) {
            return;
        }

        _sound.play('dice');

        ss.score = [0, 0];
        ss.turn = 2 - Date.now() % 2;
        ss.who_started = 1;
        ss.last_op = sample([OP_AND, OP_OR, OP_XOR]);
        ss.queue = range(QUEUE_SIZE).map(() => newBits());
        ss.page = GAME_PAGE;
    };
</script>

{#if ss.page === START_PAGE}
    <div class="start-page" in:fade>
        <div class="title">
            <span>BITWISE</span>
            <span class="subtitle">Use your bits wisely.</span>
        </div>
        <div></div>
        <img src={OppAI} alt="" width="100" onpointerdown={() => onPlay(OPP_AI)} />
        <img src={OppFriend} alt="" width="100" onpointerdown={() => onPlay(OPP_FRIEND)} />
    </div>
{/if}

<style>
    .start-page {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        justify-items: center;
    }

    .title {
        font-family: Title;
        font-size: 56px;
        font-weight: bold;
        display: grid;
        justify-items: center;
        color: #ffffffd0;
        filter: drop-shadow(0 0 5px black);
    }

    .subtitle {
        font-family: Subtitle;
        font-size: 24px;
        font-weight: normal;
    }

    img {
        cursor: pointer;
        filter: drop-shadow(0 0 5px black);
        transition: filter 0.2s;
    }

    img:hover {
        filter: drop-shadow(0 0 5px white);
    }
</style>
