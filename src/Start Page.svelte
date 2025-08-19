<script>
    import { OPP_AI, OPP_FRIEND } from './const';
    import { ss } from './state.svelte';

    const onBits = (bits) => {
        ss.bits = bits;
    };

    const onOpp = (opp) => {
        ss.opp = opp;
    };
</script>

<div class="start-page">
    <div class="title">
        <span>BITWISE</span>
        <span class="subtitle">Use your bits wisely.</span>
    </div>
    <div class="ops-box">
        <span class="subtitle">mode:</span>
        <div class="ops">
            <span class="op {ss.bits === 1 ? 'op-selected' : ''}" onpointerdown={() => onBits(1)}>1-bit</span>
            <span class="op {ss.bits === 2 ? 'op-selected' : ''}" onpointerdown={() => onBits(2)}>2-bit</span>
        </div>
    </div>
    <div class="ops-box">
        <span class="subtitle">opponent:</span>
        <div class="ops">
            <span class="op {ss.opp === OPP_FRIEND ? 'op-selected' : ''}" onpointerdown={() => onOpp(OPP_FRIEND)}>Friend</span>
            <span class="op {ss.opp === OPP_AI ? 'op-selected' : ''}" onpointerdown={() => onOpp(OPP_AI)}>AI</span>
        </div>
    </div>
</div>

<style>
    .start-page {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        gap: 50px;
    }

    .title {
        font-family: Title;
        font-size: 56px;
        font-weight: bold;
        display: grid;
        justify-items: center;
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
    }

    .op:hover {
        color: white;
    }

    .op-selected {
        pointer-events: none;
        text-decoration: underline;
    }
</style>
