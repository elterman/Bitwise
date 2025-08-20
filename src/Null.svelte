<script>
    const { height = 45, color } = $props();
    const scale = $derived(height / 220);
    const _s = $derived(35 * scale);
    const _b = $derived(30 * scale);
    const border = $derived(`${_s}px solid ${color}`);
</script>

<div class="null" style="height: {height - 2 * _b}px; border: {border};"> </div>

<style>
    .null {
        aspect-ratio: 1;
        box-sizing: border-box;
        border-radius: 50%;
    }
</style>
