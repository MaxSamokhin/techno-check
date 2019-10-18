import {
    QUESTION_REQUEST,
    QUESTION_SUCCESS,
    QUESTION_FAILURE
} from '../actions/actions-types';

const initialState = {
    inquirerId: -1,
};

export default function question(state = initialState, action) {
    switch (action.type) {
        case QUESTION_REQUEST:
            return {
                ...state,
                isLoadingQuestion: true,
                questionId: '',
                questionTitle: '',
                questionType: 'checkbox',
                answers: [],
            };
        case QUESTION_SUCCESS:
            return {
                ...state,
                isLoadingQuestion: false,
                questionTitle: action.payload.questionTitle,
                questionType: action.payload.questionType,
                answers: action.payload.answers,
                questionId: action.payload.questionId
            };
        case QUESTION_FAILURE:
            return {
                ...state,
                isLoadingQuestion: false,
            };
        default:
            return state;
    }
}
