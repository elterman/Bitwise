<script>
    import { fade } from 'svelte/transition';
    import { ss } from '../state.svelte';

    const hi = '<span style="color: var(--off-white);">';
    const sec = '<span style="margin: 10px 0 -15px; color: var(--off-white);">';
    const ul = '<ul style="margin: 15px 0 0 0;">';
    const ol = '<ol style="margin: 15px 0 0 0;">';
    const li = '<li style="margin: 5px 0 0 -20px;">';

    const CONTENT = `
        <span>${hi}BITWISE</span> is a two-player, turn-based strategy game where players manipulate a queue of 2-symbol values using ${hi}bitwise operators</span>.</span>
        ${sec}Setup</span>
        ${ul}
        ${li}The game uses ${hi}2-symbol values</span> only. Each value consists of two symbols: ${hi}X</span> and ${hi}O</span>.</li>
        ${li}A ${hi}queue</span> of randomly generated values appears on screen. Example: OO XO XX OO OX ...</li>
        ${li}Each turn, players select ${hi}one of two</span> available bitwise operators to ${hi}combine</span> the first ${hi}two values</span> in the queue.</li>
        </ul>
        ${sec}Operators</span>
        ${ul}
        ${li}Available bitwise operators: ${hi}AND, OR, XOR</span>.</li>
        ${li}The operator used on a turn becomes ${hi}unavailable on the next turn</span>. The other two operators become available again.</li>
        ${li}Operators are applied symbol-by-symbol: X is treated as binary 1, O is treated as binary 0. Example: XO OR OX = XX.</li>
        </ul>
        ${sec}Turn Structure</span>
        ${ol}
        ${li}Select an operator from the two available.</li>
        ${li}${hi}Combine</span> the first two values in the queue using the selected operator.</li>
        ${li}${hi}Replace</span> those two values with the result.</li>
        ${li}Score if the result matches your target combina-tion: ${hi}player 1 scores on XO, player 2 scores on OX</span>.</li>
        ${li}Update operator availability for the next turn.</li>
        ${li}Next player's turn begins.</li>
        </ol>
        ${sec}The game ends when:</span>
        ${ul}
        ${li}Both players have completed the ${hi}same number of turns</span>, and</li>
        ${li}At least one player has scored ${hi}10 or more</span> points, and</span></li>
        ${li}The point difference is ${hi}2 or more</span>.</li>
        </ul>
`;

    const onClose = () => {
        delete ss.help;
    };
</script>

<div class="help" tabindex="-1" onpointerdown={onClose} transition:fade={{ duration: 200 }}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html CONTENT}
</div>

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
