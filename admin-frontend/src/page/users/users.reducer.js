import {USERS_ERROR_SERVER, USERS_LOADING, USERS_SUCCESS, USER_STOP_LOADING} from './users.constant';


const initialState = {
    isLoadingUsers: false,
    userList: [],
    errorMsgUsers: null
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                isLoadingUsers: true,
                errorMsgUsers: null,
            };
        case USERS_SUCCESS: {
            console.log(USERS_SUCCESS, action.payload);
            return {
                ...state,
                userList: action.payload,
                isLoadingUsers: false,
                errorMsgUsers: null,
            };
        }
        case USERS_ERROR_SERVER:
            return {
                ...state,
                errorMsgUsers: action.payload,
                isLoadingUsers: false,
            };
        case USER_STOP_LOADING:
            return {
                ...state,
                isLoadingUsers: false,
            };
        default:
            return state;
    }
}
