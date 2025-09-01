import { APP_STATE, START_PAGE } from './const';
import { OPP_AI, PROMPT_TRANSITION } from './const';
import { post } from './utils';

export const ss = $state({
    opp: OPP_AI,
    score: [0, 0],
    appKey: () => `${APP_STATE} • ${ss.opp}`,
    page: START_PAGE,
    show_reference: true,
});

export const _prompt = $state({
    id: '',
    opacity: 0,

    set: (id) => {
        const doSet = () => {
            _prompt.id = id;
            _prompt.opacity = id ? 1 : 0;
        };

        if (_prompt.id) {
            _prompt.opacity = 0;
            post(() => { _prompt.id = null; doSet(); }, PROMPT_TRANSITION);
        } else {
            doSet();
        }
    }
});

export const _stats = $state({
    plays: 0,
    won: 0,
    total_points: [0, 0],
});