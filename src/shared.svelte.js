import { sample } from 'lodash-es';
import { APP_STATE, QUEUE_SIZE } from './const';
import { _sound } from './sound.svelte';
import { _stats, ss } from './state.svelte';
import { post } from './utils';

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

export const xoSize = () => ss.show_reference ? 21 : 20;

export const fn = (op) => {
    const bits1 = ss.queue[QUEUE_SIZE - 1];
    const bits2 = ss.queue[QUEUE_SIZE - 2];

    switch (op) {
        case 'AND':
            return [bits1[0] & bits2[0], bits1[1] & bits2[1]];
        case 'OR':
            return [bits1[0] | bits2[0], bits1[1] | bits2[1]];
        case 'XOR':
            return [bits1[0] ^ bits2[0], bits1[1] ^ bits2[1]];
        default:
            return [0, 0];
    }
};

export const onClickOp = (op) => {
    ss.op = op;
    const output = $derived(fn(op));

    const score = [...ss.score];

    if (ss.bits === 1) {
        ss.score[output[0] === 1 ? 0 : 1] += 1;
    } else {
        if (output[0] === 1 && output[1] === 0) {
            ss.score[0] += 1;
        } else if (output[0] === 0 && output[1] === 1) {
            ss.score[1] += 1;
        }
    }

    const keepTurn = false;

    if (keepTurn && ss.score[0] > score[0]) {
        ss.turn = 1;
    } else if (keepTurn && ss.score[1] > score[1]) {
        ss.turn = 2;
    } else {
        ss.turn = 3 - ss.turn;
    }

    ss.new = newBits();

    post(() => {
        _sound.play('cluck');
        const que = [...ss.queue];
        que.unshift(ss.new);
        que.splice(QUEUE_SIZE - 1, 2, output);
        ss.queue = que;
        ss.last_op = op;

        delete ss.new;
        delete ss.op;
    }, 750);
};
