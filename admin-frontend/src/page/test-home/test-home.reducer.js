import {
    HOME_TEST_LOADING,
    HOME_TEST_SUCCESS,
    HOME_TEST_ERROR_SERVER,
    HOME_TEST_STOP_LOADING
} from './test-home.constant';


const initialState = {
    isLoadingTestHome: false,
    errorMsgTestHome: null,
    testsHome: [],
};

export default function testHome(state = initialState, action) {
    switch (action.type) {
        case HOME_TEST_LOADING:
            return {
                ...state,
                isLoadingTestHome: true,
                errorMsgTestHome: null,
            };
        case HOME_TEST_SUCCESS: {
            return {
                ...state,
                testsHome: action.payload,
                isLoadingTestHome: false,
                errorMsgTestHome: null,
            };
        }
        case HOME_TEST_ERROR_SERVER:
            return {
                ...state,
                errorMsgTestHome: action.payload,
                isLoadingTestHome: false,
            };
        case HOME_TEST_STOP_LOADING:
            return {
                ...state,
                isLoadingTestHome: false,
            };
        default:
            return state;
    }
}
