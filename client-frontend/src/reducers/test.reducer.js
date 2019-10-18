import {
    TEST_REQUEST,
    SET_TEST_TITLE,
    TEST_SUCCESS,
    TEST_FAILURE
} from '../actions/actions-types';


const initialState = {
    tests: [],
    currentTestTitle: '',
    isLoadingTest: false
};

export default function test(state = initialState, action) {
    switch (action.type) {
        case TEST_REQUEST:
            return {
                ...state,
                isLoadingTest: true,
                tests: [],
            };
        case SET_TEST_TITLE:
            return {
                ...state,
                currentTestTitle: action.payload
            };
        case TEST_SUCCESS:
            return {
                ...state,
                isLoadingTest: false,
                tests: action.payload
            };
        case TEST_FAILURE:
            return {
                ...state,
                isLoadingTest: false,
            };
        default:
            return state;
    }
}
