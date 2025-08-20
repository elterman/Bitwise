<script>
    import { ss } from './state.svelte';
    import { post } from './utils';

    const { op } = $props();

    const onOpSelect = () => {
        ss.op = op;

        post(() => {
            ss.last_op = op;
            delete ss.op;
        }, 1000);
    };
</script>

<div class="op {op === ss.op ? 'selected' : ss.op || op === ss.last_op ? 'disabled' : ''}" onpointerdown={onOpSelect}>{op}</div>

<style>
    .op {
        display: grid;
        justify-items: center;
        cursor: pointer;
        transition: color 0.2s;
    }

    .op:hover {
        color: white;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    .selected {
        /* text-decoration: overline; */
        pointer-events: none;
        color: white;
    }
</style>
