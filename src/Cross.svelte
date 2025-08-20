<script>
    import { OFFWHITE } from './const';
    const { width = 20, color = OFFWHITE } = $props();
</script>

<svg id="svg-x" style='' width={width} height={width} viewBox = '0 0 100 100' xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} stroke-width={24} stroke-linecap="round" d="M 12,12 L88,88 M 88,12 L 12,88" />
</svg>

<style>
</style>
