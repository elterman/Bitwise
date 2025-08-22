import { APP_STATE } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({
        ..._stats, ..._sound, queue: ss.queue, score: ss.score,
        turn: ss.turn, who_started: ss.who_started, disabled_op: ss.disabled_op,
    });
    
    localStorage.setItem(APP_STATE, json);
};
