<script>
    import Hand from '$lib/images/Hand.webp';
    import { fade } from 'svelte/transition';
    import { _sound } from './sound.svelte';
    import { post } from './utils';

    let scale = $state(1);
    let transform = $state('translate(-45px, -50px)');

    $effect(() => {
        post(() => (transform = 'translate(-180px, 100px)'), 2000);

        const onTransitionEnd = (e) => {
            const id = e.target.id;

            if (e.propertyName !== 'transform') {
                return;
            }

            if (id === 'hand') {
                post(() => {
                    _sound.play('click');
                    scale = 0.8;
                }, 300);
            } else if (id === 'icon') {
                if (scale < 1) {
                    scale = 1;
                }
            }
        };

        window.addEventListener('transitionend', onTransitionEnd);
        return () => window.removeEventListener('transitionend', onTransitionEnd);
    });
</script>

<div id="hand" class="hand" style="transform: {transform};">
    <img id="icon" class={scale < 1 ? 'scale' : ''} src={Hand} alt="" width={40} transition:fade={{ delay: 700 }} />
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
