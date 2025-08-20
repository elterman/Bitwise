import { APP_STATE } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({ ..._stats, sfx: _sound.sfx, music: _sound.music });
    localStorage.setItem(APP_STATE, json);
};
