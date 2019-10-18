import {
    GROUP_BY_QUESTION,
    GROUP_BY_USER,
} from './grouping.constant.js';

const initialState = {
    groupByQuestion: true,
    groupByUser: false,
};

export default function grouping(state = initialState, action) {
    switch (action.type) {
        case GROUP_BY_QUESTION:
            return {
                ...state,
                groupByQuestion: true,
                groupByUser: false,
            };
        case GROUP_BY_USER: {
            return {
                ...state,
                groupByQuestion: false,
                groupByUser: true,
            };
        }
        default:
            return state;
    }
}
