<script>
    import O from '$lib/images/O.webp';
    import X from '$lib/images/X.webp';

    // const { x, size, filter = 'invert(1) opacity(0.75)' } = $props();
    const { x, size, filter = 'invert(0.25)' } = $props();
</script>

<img class="bit" src={x ? X : O} alt="" width={size} style="filter: {filter}" />

<style>
    .bit {
        place-self: center;
        display: grid;
        transition: width 0.3s;
    }
</style>
