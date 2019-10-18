import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT,
    LOG_IN_ERROR_SERVER,
    USER_AUTH_SUCCESS,
    USER_AUTH_ERROR
} from '../actions/actions-types';

const initialState = {
    email: null,
    isSuperuser: false,
    isAuth: false,
    errorMsg: null,
    isLoading: false,
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMsg: null,
                isAuth: false,
                email: null,
                isSuperuser: false,
            };
        case LOG_IN_SUCCESS: {
            console.log('LOG_IN_SUCCESS', action.payload);
            return {
                ...state,
                errorMsg: null,
                isAuth: true,
                isLoading: false,
                email: null,
                isSuperuser: false,
            };
        }
        case LOG_OUT:
            return {
                ...state,
                errorMsg: null,
                isAuth: false,
                isLoading: false,
                email: null,
                isSuperuser: false,
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                errorMsg: action.payload,
                isAuth: false,
                isLoading: false,
                email: null,
                isSuperuser: false,
            };
        case LOG_IN_ERROR_SERVER:
            return {
                ...state,
                isLoadingUser: false,
                errorMsg: action.payload,
                isAuth: false,
                isLoading: false,
                email: null,
                isSuperuser: false,
            };
        case USER_AUTH_SUCCESS: {
            const {email, isSuperuser} = action.payload;
            console.log('USER_AUTH_SUCCESS', email, isSuperuser);
            return {
                ...state,
                isAuth: true,
                email: email,
                isSuperuser: isSuperuser,
            };
        }
        case USER_AUTH_ERROR:
            return {
                ...state,
                isAuth: false,
                email: null,
                isSuperuser: false,
            };
        default:
            return state;
    }
}
