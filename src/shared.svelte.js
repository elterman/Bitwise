import { sample } from 'lodash-es';
import { CHEER_PLAYER1_WON, CHEER_PLAYER2_WON, CHEER_YOU_LOST, CHEER_YOU_WON, CHIME_LOST, CHIME_PLAYER1_WINS, CHIME_PLAYER2_WINS, CHIME_WON, OP_AND, OP_OR, OP_XOR, OPP_AI, OPP_FRIEND, POINTS_TO_WIN, PROMPT_PLAY_AGAIN, QUEUE_SIZE } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';
import { post, range } from './utils';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({
        ..._stats, ..._sound, started: ss.started, queue: ss.queue, score: ss.score, over: ss.over,
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
    if (!ss.started) {
        ss.started = true;

        if (ss.opp === OPP_AI) {
            _stats.plays += 1;
        }
    }

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

        if (ss.turn === ss.who_started) {
            const s1 = ss.score[0];
            const s2 = ss.score[1];

            if ((s1 >= POINTS_TO_WIN || s2 >= POINTS_TO_WIN) && Math.abs(s1 - s2) >= 2) {
                onOver(s1 > s2 ? 1 : 2);
            }
        }
    }, 750);
};

const onOver = (player) => {
    ss.over = player;

    delete ss.op;
    delete ss.last_op;

    if (ss.opp === OPP_FRIEND) {
        _stats.plays += 1;
    }

    if (player === 1) {
        _stats.won += 1;
    }

    const [s1, s2] = _stats.total_points;
    _stats.total_points = [s1 + ss.score[0], s2 + ss.score[1]];

    persist();

    let chime = CHIME_WON;
    let cheer;

    if (ss.opp === OPP_AI) {
        cheer = player === 1 ? CHEER_YOU_WON : CHEER_YOU_LOST;
        chime = player === 1 ? CHIME_WON : CHIME_LOST;
    } else {
        cheer = player === 1 ? CHEER_PLAYER1_WON : CHEER_PLAYER2_WON;
        chime = player === 1 ? CHIME_PLAYER1_WINS : CHIME_PLAYER2_WINS;
    }

    post(() => {
        _sound.play(chime);
        _prompt.set(cheer);

        post(() => _prompt.set(PROMPT_PLAY_AGAIN), 3000);
    }, 500);
};

export const onPlay = () => {
    _sound.play('dice');

    delete ss.over;
    delete ss.started;
    _prompt.set(null);

    ss.score = [0, 0];
    ss.turn = ss.opp === OPP_FRIEND ? 2 - (Date.now() % 2) : 1;
    ss.who_started = ss.turn;
    ss.last_op = sample([OP_AND, OP_OR, OP_XOR]);

    if (!ss.queue) {
        ss.queue = range(QUEUE_SIZE).map(() => newBits());
    }

    persist();
};