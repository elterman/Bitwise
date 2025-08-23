import { sample } from 'lodash-es';
import { APP_STATE } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({
        ..._stats, ..._sound, queue: ss.queue, score: ss.score,
        turn: ss.turn, who_started: ss.who_started, last_op: ss.last_op,
    });

    localStorage.setItem(APP_STATE, json);
};

export const valueColor = (bits) => {
    const b1 = bits[0];
    const b2 = bits[1];

    if (ss.bits === 1) {
        return b1 ? 'yellow' : 'blue';
    }

    return b1 && b2 ? 'green' : b1 && !b2 ? 'yellow' : b2 && !b1 ? 'blue' : 'off-white';
};

export const newBits = () => sample([[0, 0], [0, 1], [1, 0], [1, 1]]);
