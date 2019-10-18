import {
    CATEGORY_ERROR_SERVER,
    CATEGORY_LOADING, CATEGORY_REDIRECT_TO_TESTS,
    CATEGORY_STOP_LOADING,
    CATEGORY_SUCCESS,
    QUESTIONS_SUCCESS,
    CATEGORY_CLEAR_QUESTION_LIST
} from './category.constant';


const initialState = {
    isLoadingCategory: false,
    isLoadingQuestions: false,
    questions: [],
    category: {},
    errorCategoryMsg: null,
    redirectToTest: false
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoadingCategory: true,
                isLoadingQuestions: true,
                errorCategoryMsg: null
            };
        case CATEGORY_SUCCESS: {

            console.log(CATEGORY_SUCCESS);
            console.log(action.payload);

            return {
                ...state,
                category: action.payload,
                isLoadingCategory: false,
                errorCategoryMsg: null,
                redirectToTest: false
            };
        }
        case QUESTIONS_SUCCESS: {
            return {
                ...state,
                questions: [...action.payload],
                errorCategoryMsg: null,
                isLoadingQuestions: false,
                redirectToTest: false
            };
        }
        case CATEGORY_ERROR_SERVER:
            return {
                ...state,
                errorCategoryMsg: action.payload,
                isLoadingCategory: false,
                isLoadingQuestions: false,
                redirectToTest: false
            };
        case CATEGORY_STOP_LOADING:
            return {
                ...state,
                isLoadingCategory: false,
                isLoadingQuestions: false
            };
        case CATEGORY_REDIRECT_TO_TESTS:
            return {
                ...state,
                redirectToTest: true
            };
        case CATEGORY_CLEAR_QUESTION_LIST:
            return {
                ...state,
                questions: []
            };
        default:
            return state;
    }
}
