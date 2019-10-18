import {GET_QUESTION_STATISTIC} from './statistic.constant';

const initialState = {
    questionStatistic: null,
};

export default function statistic(state = initialState, action) {
    switch (action.type) {
        case GET_QUESTION_STATISTIC: {
            return {
                ...state,
                questionStatistic: action.payload,
            };
        }
        default:
            return state;
    }
}
