<script>
    import { OPP_AI, PROMPT_NO, PROMPT_PLAY_AGAIN, PROMPT_RESET_STATS, PROMPT_RESTART, PROMPT_START_OVER } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { onPlay, persist } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { _prompt, _stats, ss } from './state.svelte';

    const label = $derived(_prompt.id);

    $effect(() => {
        const onTransitionEnd = (e) => {
            const id = e.target.id;

            if (id !== 'prompt') {
                return false;
            }

            if (e.propertyName !== 'opacity') {
                return;
            }

            if (_prompt.opacity == 0) {
                _prompt.set(ss.over ? PROMPT_PLAY_AGAIN : null);
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });

    const onResetStats = () => {
        _sound.play('link1', { rate: 0.7 });

        _stats.plays = 0;
        _stats.won = 0;
        _stats.total_points = [0, 0];

        persist();
    };

    const onRestart = () => {
        if (ss.opp === OPP_AI) {
            _stats.plays += 1;
        }

        onPlayAgain();
    };

    const onPlayAgain = () => {
        _sound.play('plop');
        onPlay();
    };

    const style = `font-size: ${24}px;`;
</script>

<div id="prompt" class="prompt {_prompt.opacity ? 'visible' : ''}">
    {#if label === PROMPT_PLAY_AGAIN}
        <PromptPanel ops={[{ label, style, onClick: onPlayAgain }]} />
    {:else if label === PROMPT_RESTART}
        <PromptPanel
            ops={[
                { label: ss.opp === OPP_AI ? PROMPT_RESTART : PROMPT_START_OVER, style, onClick: onRestart },
                { label: PROMPT_NO, style },
            ]} />
    {:else if label === PROMPT_RESET_STATS}
        <PromptPanel
            ops={[
                { label, style, onClick: onResetStats },
                { label: PROMPT_NO, style },
            ]} />
    {:else if label}
        <PromptPanel ops={[{ label, style }]} />
    {/if}
</div>

<style>
    .prompt {
        grid-area: 5/1;
        place-self: center;
        transform: scale(0);
        opacity: 0;
        z-index: 1;
        transition: 0.3s;
        height: 52px;
        place-content: center;
    }

    .visible {
        opacity: 1;
        transform: scale(1);
    }
</style>
