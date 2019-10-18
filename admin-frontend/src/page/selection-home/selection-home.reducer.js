import {
    HOME_SELECTION_LOADING,
    HOME_SELECTION_SUCCESS,
    HOME_SELECTION_ERROR_SERVER,
    HOME_SELECTION_STOP_LOADING
} from './selection-home.constant';


const initialState = {
    isLoadingSelectionHome: false,
    errorMsgSelectionHome: null,
    selectionHome: [],
};

export default function selectionHome(state = initialState, action) {
    switch (action.type) {
        case HOME_SELECTION_LOADING:
            return {
                ...state,
                isLoadingSelectionHome: true,
                errorMsgSelectionHome: null,
            };
        case HOME_SELECTION_SUCCESS: {
            return {
                ...state,
                selectionHome: action.payload,
                isLoadingSelectionHome: false,
                errorMsgSelectionHome: null,
            };
        }
        case HOME_SELECTION_ERROR_SERVER:
            return {
                ...state,
                errorMsgSelectionHome: action.payload,
                isLoadingSelectionHome: false,
            };
        case HOME_SELECTION_STOP_LOADING:
            return {
                ...state,
                isLoadingSelectionHome: false,
            };
        default:
            return state;
    }
}
