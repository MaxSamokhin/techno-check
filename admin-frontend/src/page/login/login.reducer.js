import {LOG_IN_LOADING, LOG_IN_SET_ERROR, LOG_OUT, LOG_IN_USER_SUCCESS} from './login.constant.js';
import {LOG_IN_SET_NO_ACCESS, LOG_IS_NOT_AUTH} from './login.constant';

const initialState = {
    email: null,
    isSuperuser: false,
    isAuth: false,
    loginErrorMsg: null,
    isLoading: false,
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case LOG_IN_USER_SUCCESS: {
            const {email, isSuperuser} = action.payload;

            console.log(LOG_IN_USER_SUCCESS);
            console.log(email, isSuperuser);

            return {
                ...state,
                isAuth: true,
                email: email,
                isSuperuser: isSuperuser,
                isLoading: false
            };
        }
        case LOG_OUT:
            return {
                ...state,
                loginErrorMsg: null,
                isAuth: false,
                isLoading: false,
                email: null,
                isSuperuser: false,
            };
        case LOG_IS_NOT_AUTH:
            return {
                ...state,
                isAuth: false,
            };
        case LOG_IN_SET_ERROR: {
            const {error} = action.payload;
            return {
                ...state,
                loginErrorMsg: error,
                isLoading: false,
            };
        }
        case LOG_IN_SET_NO_ACCESS: {
            return {
                ...state,
                isSuperuser: false
            };
        }
        case LOG_IN_LOADING:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
}
