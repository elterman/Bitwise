<script>
    import { fade } from 'svelte/transition';
    import { GAME_PAGE, OPP_AI, OPP_FRIEND, START_PAGE } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { ss } from './state.svelte';

    const onBits = (bits) => {
        ss.bits = bits;
    };

    const onOpp = (opp) => {
        ss.opp = opp;
    };

    const onPlay = () => {
        ss.page = GAME_PAGE;
    };
</script>

{#if ss.page === START_PAGE}
    <div class="start-page" in:fade>
        <div class="title">
            <span>BITWISE</span>
            <span class="subtitle">Use your bits wisely.</span>
        </div>
        <div class="ops-box modes">
            <span class="subtitle">mode:</span>
            <div class="ops">
                <span class="op {ss.bits === 1 ? 'op-selected' : ''}" onpointerdown={() => onBits(1)}>1-bit</span>
                <span class="op {ss.bits === 2 ? 'op-selected' : ''}" onpointerdown={() => onBits(2)}>2-bit</span>
            </div>
        </div>
        <div class="ops-box opps">
            <span class="subtitle">opponent:</span>
            <div class="ops">
                <span class="op {ss.opp === OPP_FRIEND ? 'op-selected' : ''}" onpointerdown={() => onOpp(OPP_FRIEND)}>Friend</span>
                <span class="op {ss.opp === OPP_AI ? 'op-selected' : ''}" onpointerdown={() => onOpp(OPP_AI)}>AI</span>
            </div>
        </div>
        <PromptPanel ops={[{ label: 'play', onClick: onPlay }]} />
    </div>
{/if}

<style>
    .start-page {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        filter: drop-shadow(0 0 5px black);
    }

    .title {
        font-family: Title;
        font-size: 56px;
        font-weight: bold;
        display: grid;
        justify-items: center;
        color: #ffffffd0;
    }

    .subtitle {
        font-family: Subtitle;
        font-size: 24px;
        font-weight: normal;
    }

    .ops-box {
        display: grid;
        gap: 10px;
    }

    .modes {
        margin-top: 50px;
    }

    .opps {
        margin-bottom: 50px;
        font-family: UI;
    }

    .ops {
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        gap: 30px;
        font-family: Title;
        font-size: 24px;
    }

    .op {
        cursor: pointer;
        font-family: UI;
        font-size: 28px;
    }

    .op:hover {
        color: white;
    }

    .op-selected {
        pointer-events: none;
        /* text-decoration: overline; */
        font-weight: bold;
        color: white;
    }
</style>
