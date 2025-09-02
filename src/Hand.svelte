<script>
    import Hand from '$lib/images/Hand.webp';
    import { sample } from 'lodash-es';
    import { scale } from 'svelte/transition';
    import { OP_AND, OP_OR, OP_XOR } from './const';
    import { fn } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { post } from './utils';

    let pressed = $state();
    let transform = $state('translate(-45px, -50px)');
    let op = $state();

    const chooseOp = () => {
        const ops = [OP_AND, OP_OR, OP_XOR].filter((op) => op !== ss.op && op !== ss.last_op);
        const outs = ops.map((o) => fn(o));

        const goodOuts = outs.filter((bits) => !bits[0] && bits[1]);

        if (goodOuts.length === 1) {
            const i = outs.findIndex((bits) => !bits[0] && bits[1]);
            op = ops[i];
            return;
        }

        const badOuts = outs.filter((bits) => bits[0] && !bits[1]);

        if (badOuts.length === 1) {
            const i = outs.findIndex((bits) => !bits[0] || bits[1]);
            op = ops[i];
            return;
        }

        // both are either good or bad

        const decents = [];
        const bads = [];

        for (let i = 0; i < 2; i++) {
            const _op = ops[i];
            const out = outs[i];

            const que = [...ss.queue];
            que.splice(que.length - 2, 2, out);

            const _ops = [OP_AND, OP_OR, OP_XOR].filter((o) => o !== _op);
            const _outs = _ops.map((o) => fn(o, que));

            // both outputs are good?
            if (_outs.every(bits => !bits[0] && bits[1])) {
                op = _op;
                return;
            }

            // neither output is bad?
            if (_outs.every(bits => !bits[0] || bits[1])) {
                decents.push(_op);
            }

            // both outputs are bad?
            if (_outs.every(bits => bits[0] && !bits[1])) {
                bads.push(_op);
            }
        }

        if (decents.length) {
            op = decents[0];
            return;
        }

        if (bads.length === 1) {
            op = ops.find(o => o !== bads[0]);
            return;
        }

        op = sample(ops);
    };

    $effect(() => {
        post(() => {
            chooseOp();

            const dx = { AND: -170, OR: -92, XOR: -15 };
            transform = `translate(${dx[op]}px, 100px)`;

            post(() => (ss.robo_op = op), 800);
        }, 2000);

        const onTransitionEnd = (e) => {
            const id = e.target.id;

            if (e.propertyName !== 'transform' && e.propertyName !== 'scale') {
                return;
            }

            if (id === 'hand') {
                post(() => {
                    _sound.play('click');
                    pressed = true;
                }, 300);
            } else if (id === 'icon') {
                if (pressed) {
                    pressed = false;
                    ss.pressed = op;
                }
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });
</script>

<div id="hand" class="hand" style="transform: {transform};">
    <img
        id="icon"
        class={pressed ? 'pressed' : ''}
        src={Hand}
        alt=""
        width={40}
        in:scale={{ delay: 700 }}
        out:scale={{ delay: 500, opacity: 1 }} />
</div>

<style>
    .hand {
        grid-area: 3/1;
        place-self: end;
        transform: translate(-45px, -50px);
        transition: transform 1s linear;
        z-index: 1;
    }

    img {
        transition: 0.2s linear;
    }

    .pressed {
        scale: 0.8;
    }
</style>
