import {
    QUESTION_ANSWERS_SUCCESS,
    QUESTION_ERROR_SERVER,
    QUESTION_LOADING, QUESTION_REDIRECT_TO_CATEGORY,
    QUESTION_STOP_LOADING,
    QUESTION_SUCCESS
} from './question.constant';


const initialState = {
    isLoadingQuestion: false,
    isLoadingAnswers: false,
    question: null,
    errorMsgQuestion: null,
    questionAnswers: [],
    redirectToCategory: false
};

export default function question(state = initialState, action) {
    switch (action.type) {
        case QUESTION_LOADING:
            return {
                ...state,
                isLoadingQuestion: true,
                isLoadingAnswers: true,
                errorMsgQuestion: null,
                redirectToCategory: false
            };
        case QUESTION_SUCCESS: {
            return {
                ...state,
                question: action.payload,
                isLoadingQuestion: false,
                errorMsgQuestion: null,
                questionAnswers: action.payload.questionAnswers,
                redirectToCategory: false
            };
        }
        case QUESTION_ERROR_SERVER:
            return {
                ...state,
                errorMsgQuestion: action.payload,
                isLoadingQuestion: false,
                isLoadingAnswers: false,
                redirectToCategory: false
            };
        case QUESTION_ANSWERS_SUCCESS:
            return {
                ...state,
                isLoadingAnswers: false,
                questionAnswers: [...action.payload],
                errorMsgQuestion: null,
                redirectToCategory: false
            };
        case QUESTION_STOP_LOADING:
            return {
                ...state,
                isLoadingQuestion: false,
                isLoadingAnswers: false,
                redirectToCategory: false
            };
        case QUESTION_REDIRECT_TO_CATEGORY: {
            return {
                ...state,
                redirectToCategory: true
            };
        }
        default:
            return state;
    }
}
