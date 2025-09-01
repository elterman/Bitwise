<script>
    import Back from '$lib/images/Back.webp';
    import MusicOff from '$lib/images/Music Off.webp';
    import MusicOn from '$lib/images/Music On.webp';
    import Help from '$lib/images/Question.webp';
    import ResetStats from '$lib/images/Reset Stats.webp';
    import Restart from '$lib/images/Restart.webp';
    import SoundOff from '$lib/images/Sound Off.webp';
    import SoundOn from '$lib/images/Sound On.webp';
    import { OPP_AI, PROMPT_RESET_STATS, PROMPT_RESTART, START_PAGE } from './const';
    import { persist } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { _prompt, _stats, ss } from './state.svelte';
    import ToolButton from './Tool Button.svelte';

    const onBack = () => {
        _prompt.set(null);
        ss.page = START_PAGE;
    };

    const onHelp = () => {
        ss.help = true;
    };

    const onResetStats = () => {
        if (_prompt.id == PROMPT_RESET_STATS) {
            _prompt.opacity = 0;
            return;
        }

        _sound.play('plop');
        _prompt.set(PROMPT_RESET_STATS);
    };

    const onRestart = () => {
        if (_prompt.id == PROMPT_RESTART) {
            _prompt.opacity = 0;
            return;
        }

        _sound.play('plop');
        _prompt.set(PROMPT_RESTART);
    };

    const onSound = () => {
        _sound.sfx = !_sound.sfx;

        if (_sound.sfx) {
            _sound.play('won', { rate: 4 });
        }

        persist();
    };

    const onMusic = () => {
        _sound.music = !_sound.music;

        if (_sound.music) {
            _sound.playMusic();
        } else {
            _sound.stopMusic();
        }

        persist();
    };

    const operating = $derived(ss.op || (!ss.over && ss.opp === OPP_AI && ss.turn === 2));
</script>

<div class="toolbar">
    <ToolButton id="tb-back" src={Back} onClick={onBack} disabled={operating} />
    <ToolButton id="tb-help" src={Help} onClick={onHelp} disabled={operating}/>
    <ToolButton id="tb-restart" src={Restart} onClick={onRestart} disabled={!ss.started || ss.over} />
    <ToolButton id="tb-reset-stats" src={ResetStats} onClick={onResetStats} disabled={_stats.plays === 0} />
    <ToolButton id="tb-sfx" src={_sound.sfx ? SoundOn : SoundOff} onClick={onSound} />
    <ToolButton id="tb-music" src={_sound.music ? MusicOn : MusicOff} onClick={onMusic} />
</div>

<style>
    .toolbar {
        grid-area: 6/1;
        display: grid;
        grid-auto-flow: column;
        place-content: center;
        gap: 5px;
        filter: drop-shadow(0 0 6px #000000);
    }
</style>
