<script>
    import { OFFWHITE } from './const';
    const { width = 21, color = OFFWHITE } = $props();
</script>

<svg id="svg-x" style='' width={width} height={width} viewBox = '0 0 100 100' xmlns="http://www.w3.org/2000/svg">
    <circle cx={50} cy={50} stroke-width={20} r={40} stroke={color} fill='none'/>
</svg>

<style>
</style>
