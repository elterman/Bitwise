<script>
    import Hand from '$lib/images/Hand.webp';
    import { sample } from 'lodash-es';
    import { fade, scale } from 'svelte/transition';
    import { OP_AND, OP_OR, OP_XOR } from './const';
    import { ss } from './state.svelte';
    import { post } from './utils';
    import { _sound } from './sound.svelte';

    let _scale = $state(1);
    let transform = $state('translate(-45px, -50px)');
    let op = $state();

    $effect(() => {
        post(() => {
            const ops = [OP_AND, OP_OR, OP_XOR].filter((op) => op !== ss.op && op !== ss.last_op);
            op = sample(ops);
            const dx = { AND: -170, OR: -92, XOR: -15 };
            transform = `translate(${dx[op]}px, 100px)`;

            post(() => (ss.robo_op = op), 800);
        }, 2000);

        const onTransitionEnd = (e) => {
            const id = e.target.id;

            if (e.propertyName !== 'transform') {
                return;
            }

            if (id === 'hand') {
                post(() => {
                    _sound.play('click');
                    _scale = 0.8;
                }, 300);
            } else if (id === 'icon') {
                if (_scale < 1) {
                    _scale = 1;
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
        class={_scale < 1 ? 'scale' : ''}
        src={Hand}
        alt=""
        width={40}
        in:scale={{ delay: 700 }}
        out:scale={{ delay: 500, opacity: 1, duration: 500 }} />
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

    .scale {
        transform: scale(0.8);
    }
</style>
