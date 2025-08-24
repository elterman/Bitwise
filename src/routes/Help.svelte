<script>
    import { fade } from 'svelte/transition';
    import { ss } from '../state.svelte';

    const hi = '<span style="color: var(--off-white);">';
    const sec = '<span style="margin: 10px 0 -15px; color: var(--off-white);">';
    const ul = '<ul style="margin: 15px 0 0 0;">';
    const ol = '<ol style="margin: 15px 0 0 0;">';
    const li = '<li style="margin: 5px 0 0 -20px;">';

    const CONTENT = `
        <span>${hi}BITWISE</span> is a two-player, turn-based strategy game where players manipulate a queue of 2-symbol values using bitwise operators.</span>
        ${sec}Setup</span>
        ${ul}
        ${li}The game uses 2-symbol values only. Each value consists of two symbols: X and O.</li>
        ${li}A queue of randomly generated values appears on screen. Example: OO XO XX OO OX ...</li>
        ${li}Each turn, players select one of two available bitwise operators to combine the first two values in the queue.</li>
        </ul>
        ${sec}Operators</span>
        ${ul}
        ${li}Available bitwise operators: AND, OR, XOR.</li>
        ${li}The operator used on a turn becomes unavailable on the next turn. The other two operators become available again.</li>
        ${li}Operators are applied symbol-by-symbol: X is treated as binary 1, O is treated as binary 0. Example: XO OR OX = XX.</li>
        </ul>
        ${sec}Turn Structure</span>
        ${ol}
        ${li}Select an operator from the two available.</li>
        ${li}Combine the first two values in the queue using the selected operator.</li>
        ${li}Replace those two values with the result.</li>
        ${li}Score if the result matches your target combina-tion: player 1 scores on XO, player 2 scores on OX.</li>
        ${li}Update operator availability for the next turn.</li>
        ${li}Next player's turn begins.</li>
        </ol>
        ${sec}The game ends when:</span>
        ${ul}
        ${li}Both players have completed the same number of turns, and </li>
        ${li}At least one player has scored 10 or more points, and</li>
        ${li}The point difference is 2 or more.</li>
        </ul>
`;

    const onClose = () => {
        delete ss.help;
    };
</script>

{#if ss.help}
    <div class="help" tabindex="-1" onpointerdown={onClose} transition:fade>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html CONTENT}
    </div>
{/if}

<style>
    .help {
        grid-area: 1/1 / span 6/1;
        display: grid;
        place-content: center;
        font-family: UI;
        font-size: 15px;
        color: var(--blue);
    }
</style>
