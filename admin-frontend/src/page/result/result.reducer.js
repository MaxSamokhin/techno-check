import {
    RESULT_LOADING,
    RESULT_SUCCESS,
    RESULT_ERROR_SERVER
} from './result.constant';


const initialState = {
    isLoadingResult: false,
    errorMsgResult: null,
    result: null,
};

export default function result(state = initialState, action) {
    switch (action.type) {
        case RESULT_LOADING:
            return {
                ...state,
                isLoadingResult: true,
                errorMsgResult: null,
            };
        case RESULT_SUCCESS: {
            return {
                ...state,
                result: action.payload,
                isLoadingResult: false,
                errorMsgResult: null,
            };
        }
        case RESULT_ERROR_SERVER:
            return {
                ...state,
                errorMsgResult: action.payload,
                isLoadingResult: false,
            };
        default:
            return state;
    }
}
