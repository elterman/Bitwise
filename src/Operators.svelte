<script>
    import { OP_AND, OP_OR, OP_XOR } from './const';
    import Operator from './Operator.svelte';

</script>

<div class="operators">
    <Operator op={OP_AND}/>
    <Operator op={OP_OR}/>
    <Operator op={OP_XOR}/>
</div>

<style>
    .operators {
        place-self: center;
        display: grid;
        grid-auto-flow: column;
        gap: 40px;
        font-family: Title;
        font-weight: bold;
        font-size: 20px;
        filter: drop-shadow(0 0 3px #00000080);
    }
</style>
