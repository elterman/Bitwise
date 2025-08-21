<script>
    import O from '$lib/images/O.webp';
    import X from '$lib/images/X.webp';

    const { x, size, filter = 'invert(1) opacity(0.75)' } = $props();
</script>

<img class="bit" src={x ? X : O} alt="" width={size} style="filter: {filter}" />

<style>
    .bit {
        display: grid;
    }
</style>
