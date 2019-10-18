import {
    IS_RANDOM_QUESTIONS,
    IS_ALL_QUESTIONS,
    IS_NOT_RANDOM_QUESTIONS,
    IS_NOT_ALL_QUESTIONS
} from './type-question-service.constant.js';

const initialState = {
    isAllQuestion: true,
    isRandomQuestion: false
};

export default function typeQuestionService(state = initialState, action) {
    switch (action.type) {
        case IS_RANDOM_QUESTIONS: {
            return {
                ...state,
                isRandomQuestion: true
            };
        }
        case IS_ALL_QUESTIONS: {
            return {
                ...state,
                isAllQuestion: true,
            };
        }
        case IS_NOT_RANDOM_QUESTIONS: {
            return {
                ...state,
                isRandomQuestion: false
            };
        }
        case IS_NOT_ALL_QUESTIONS: {
            return {
                ...state,
                isAllQuestion: false,
            };
        }
        default:
            return state;
    }
}
