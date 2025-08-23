<script>
    import Hand from '$lib/images/Hand.webp';
    import { fade } from 'svelte/transition';
    import { OPP_AI } from './const';
    import { ss } from './state.svelte';
</script>

{#if ss.opp === OPP_AI && ss.turn === 2}
    <img src={Hand} alt="" width={40} transition:fade={{ delay: 700 }} />
{/if}

<style>
    img {
        grid-area: 3/1;
        place-self: end;
        transform: translate(-45px, -50px);
    }
</style>
