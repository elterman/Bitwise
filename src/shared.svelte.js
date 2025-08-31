import { sample } from 'lodash-es';
import { CHEER_PLAYER1_WON, CHEER_PLAYER2_WON, CHEER_YOU_LOST, CHEER_YOU_WON, CHIME_LOST, CHIME_PLAYER1_WINS, CHIME_PLAYER2_WINS, CHIME_WON, OPP_AI, POINTS_TO_WIN, PROMPT_PLAY_AGAIN, QUEUE_SIZE } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';
import { post } from './utils';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({
        ..._stats, ..._sound, queue: ss.queue, score: ss.score,
        turn: ss.turn, who_started: ss.who_started, last_op: ss.last_op,
    });

    localStorage.setItem(ss.appKey(), json);
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
    delete ss.robo_op;
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

    if (ss.who_started !== ss.turn) {
        const s1 = ss.score[0];
        const s2 = ss.score[1];

        if ((s1 >= POINTS_TO_WIN || s2 >= POINTS_TO_WIN) && Math.abs(s1 - s2) >= 2) {
            onOver(s1 > s2 ? 1 : 2);
            return;
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

        persist();
    }, 750);
};

export const onOver = (player) => {
    ss.over = player;

    delete ss.op;
    delete ss.last_op;

    let chime = CHIME_WON;
    let cheer;

    if (ss.opp === OPP_AI) {
        cheer = player === 1 ? CHEER_YOU_WON : CHEER_YOU_LOST;
        chime = player === 1 ? CHIME_WON : CHIME_LOST;
    } else {
        cheer = player === 1 ? CHEER_PLAYER1_WON : CHEER_PLAYER2_WON;
        chime = player === 1 ? CHIME_PLAYER1_WINS : CHIME_PLAYER2_WINS;
    }

    _sound.play(chime);
    _prompt.set(cheer);

    post(() => _prompt.set(PROMPT_PLAY_AGAIN), 3000);
};