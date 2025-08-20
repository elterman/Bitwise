<script>
    const { height = 50, color } = $props();
    const scale = $derived(height / 220);
    const _s = $derived(35 * scale);
    const _b = $derived(30 * scale);
    const _g = $derived(`conic-gradient(${color} 0 0) no-repeat 50%/`);
    const background = $derived(`${_g} ${_b}px calc(100% - 2 * ${_s}px), ${_g} calc(100% - 2 * ${_s}px) ${_b}px`);
</script>

<div class="cross" style="height: {height}px; background: {background};"> </div>

<style>
    .cross {
        aspect-ratio: 1;
        rotate: 45deg;
    }
</style>
