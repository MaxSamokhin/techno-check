import {TEST_LOADING, TEST_SUCCESS} from './test.constant.js';
import {TEST_STOP_LOADING} from "./test.constant";

const initialState = {
    isLoadingTests: false,
    tests: null,
};

export default function tests(state = initialState, action) {
    switch (action.type) {
        case TEST_LOADING:
            return {
                ...state,
                isLoadingTest: true,
            };
        case TEST_SUCCESS: {
            return {
                ...state,
                tests: action.payload,
            };
        }
        case TEST_STOP_LOADING: {
            return {
                ...state,
                isLoadingTests: false,
            }
        }
        default:
            return state;
    }
}
