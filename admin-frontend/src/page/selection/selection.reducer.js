import {
    SELECTION_CLEAR_TESTS,
    SELECTION_ERROR_SERVER,
    SELECTION_LOADING,
    SELECTION_REDIRECT_TO_HOME,
    SELECTION_SET_ALL_TEST_SUCCESS,
    SELECTION_SET_MENU_DATA_SUCCESS,
    SELECTION_SET_TEST_SUCCESS,
    SELECTION_STOP_LOADING,
    SELECTION_SUCCESS,
    SELECTION_SET_ERROR
} from './selection.constant';


const initialState = {
    isLoadingSelection: false,
    isLoadingSelectionTest: false,
    isLoadingAllSelectionTest: false,
    errorMsgSelection: null,
    selection: null,
    testForSelection: [],
    redirectToHomeSelection: false,
    allTest: null,
};

export default function selection(state = initialState, action) {
    switch (action.type) {
        case SELECTION_LOADING:
            return {
                ...state,
                isLoadingSelection: true,
                isLoadingSelectionTest: true,
                isLoadingAllSelectionTest: true,
                isLoadingMenuData: true,
                errorMsgSelection: null,
            };
        case SELECTION_SUCCESS: {
            return {
                ...state,
                selection: action.payload,
                isLoadingSelection: false,
                errorMsgSelection: null,
                redirectToHomeSelection: false
            };
        }
        case SELECTION_ERROR_SERVER:
            return {
                ...state,
                errorMsgSelection: action.payload,
                isLoadingSelection: false,
                isLoadingSelectionTest: false,
            };
        case SELECTION_SET_TEST_SUCCESS: {
            return {
                ...state,
                testForSelection: action.payload,
                isLoadingSelectionTest: false,
                errorMsgSelection: null,
                redirectToHomeSelection: false,
            };
        }
        case SELECTION_STOP_LOADING: {
            return {
                ...state,
                isLoadingSelectionTest: false,
                isLoadingSelection: false,
                isLoadingAllSelectionTest: false,
                isLoadingMenuData: false
            };
        }
        case SELECTION_REDIRECT_TO_HOME: {

            console.log(SELECTION_REDIRECT_TO_HOME + 'reducer');

            return {
                ...state,
                redirectToHomeSelection: true,
                isLoadingSelection: false,
                isLoadingSelectionTest: false,
                isLoadingAllSelectionTest: false,
                isLoadingMenuData: false
            };
        }
        case SELECTION_SET_ALL_TEST_SUCCESS: {
            return {
                ...state,
                allTest: action.payload,
                isLoadingAllSelectionTest: false,
                errorMsgSelection: null,
                redirectToHomeSelection: false
            };
        }
        case SELECTION_SET_MENU_DATA_SUCCESS: {
            return {
                ...state,
                isLoadingMenuData: false,
                errorMsgSelection: null,
                redirectToHomeSelection: false
            };
        }
        case SELECTION_CLEAR_TESTS: {
            return {
                ...state,
                testForSelection: []
            };
        }
        case SELECTION_SET_ERROR: {
            return {
                ...state,
                errorMsgSelection: action.payload
            };
        }
        default:
            return state;
    }
}
