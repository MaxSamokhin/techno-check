import {
    MENU_CLEAR_MENU_DATA,
    MENU_ERROR_SERVER,
    MENU_LOADING,
    MENU_SET_MENU_DATA_SUCCESS,
    MENU_STOP_LOADING,
} from './menu.constant';


const initialState = {
    isLoadingMenu: false,
    menuData: null,
    errorMsgMenu: null,
};

export default function menu(state = initialState, action) {
    switch (action.type) {
        case MENU_LOADING:
            return {
                ...state,
                isLoadingMenu: true,
                errorMsgMenu: null,
            };
        case MENU_ERROR_SERVER:
            return {
                ...state,
                errorMsgMenu: action.payload,
                isLoadingMenu: false,
            };
        case MENU_STOP_LOADING: {
            return {
                ...state,
                isLoadingMenu: false,
            };
        }
        case MENU_SET_MENU_DATA_SUCCESS: {
            return {
                ...state,
                menuData: action.payload,
                isLoadingMenuData: false,
                errorMsgMenu: null,
            };
        }
        case MENU_CLEAR_MENU_DATA: {
            return {
                ...state,
                menuData: null
            };
        }
        default:
            return state;
    }
}
