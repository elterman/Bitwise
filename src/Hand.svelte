<script>
    import Hand from '$lib/images/Hand.webp';
    import { sample } from 'lodash-es';
    import { scale } from 'svelte/transition';
    import { OP_AND, OP_OR, OP_XOR } from './const';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { post } from './utils';
    import { fn } from './shared.svelte';

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

        if (goodOuts.length === 0) {
            if (badOuts.length === 1) {
                const i = outs.findIndex((bits) => !bits[0] || bits[1]);
                op = ops[i];
                return;
            }
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
