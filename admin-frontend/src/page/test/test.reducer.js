import {TEST_LOADING, TEST_SUCCESS, TEST_ERROR_SERVER, CATEGORY_SUCCESS, TEST_STOP_LOADING, TEST_CLEAR_LIST_CATEGORIES} from './test.constant';


const initialState = {
    isLoadingTest: false,
    isLoadingCategories: false,
    test: null,
    categoriesList: [],
    errorMsgTest: null
};

export default function test(state = initialState, action) {
    switch (action.type) {
        case TEST_LOADING:
            return {
                ...state,
                isLoadingTest: true,
                isLoadingCategories: true,
                errorMsgTest: null,
            };
        case TEST_SUCCESS: {
            return {
                ...state,
                test: action.payload,
                isLoadingTest: false,
                errorMsgTest: null,
            };
        }
        case CATEGORY_SUCCESS: {
            return {
                ...state,
                categoriesList: [...action.payload],
                isLoadingCategories: false,
                errorMsgTest: null,
            };
        }
        case TEST_ERROR_SERVER:
            return {
                ...state,
                errorMsgTest: action.payload,
                isLoadingCategories: false,
                isLoadingTest: false
            };
        case TEST_CLEAR_LIST_CATEGORIES:
            return {
                ...state,
                categoriesList: [],
            };
        case TEST_STOP_LOADING:
            return {
                ...state,
                isLoadingCategories: false,
                isLoadingTest: false,
            };
        default:
            return state;
    }
}
