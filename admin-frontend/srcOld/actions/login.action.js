import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT,
    LOG_IN_ERROR_SERVER,
    USER_AUTH_SUCCESS,
    // USER_AUTH_ERROR
} from './actions-types';

import checkResponse from '../service/check-response';
import Http from '../service/http';


const loginRequest = () => ({
    type: LOG_IN_REQUEST,
});

export const loginSuccess = () => ({
    type: LOG_IN_SUCCESS
});

const loginError = (msg) => ({
    type: LOG_IN_FAILURE,
    payload: msg
});

const loginServerError = (msg) => ({
    type: LOG_IN_ERROR_SERVER,
    payload: msg
});

const logout = () => ({
    type:  LOG_OUT
});

const checkUserSuccess = (res) => ({
    type: USER_AUTH_SUCCESS,
    payload: {
        email: res.email,
        isSuperuser: res.is_superuser
    }
});

export function checkUser() {
    return (dispatch) =>
        Http.get('api/auth/me')
            .then((res) => {
                console.log('api/auth/me', res);
                dispatch(checkUserSuccess(res));
            })
            .catch(() => dispatch(loginServerError('')));
}

export function logIn({email, password}) {
    return (dispatch) => {
        dispatch(loginRequest());
        Http.post('api/auth/login', {email, password})
            .then(res => {
                console.log('response', res);
                console.log('logIn', {email, password});
                if (checkResponse(res)) {

                    Http.get('api/auth/me')
                        .then((res) => {
                            console.log('api/auth/me', res);
                            dispatch(checkUserSuccess(res));
                        })
                        .catch((res) => dispatch(loginServerError(res && res.message)));

                } else {
                    dispatch(loginError('Ошибка: ' + res.message));
                }
            })
            .catch(() => {
                dispatch(loginServerError('Не удаётся подключиться к серверу'));
            });
    };
}

export function logOut() {
    return (dispatch) => {
        Http.post('api/auth/logout')
            .then((res) => {
                if (res.status === 'success') {
                    dispatch(logout());
                }
            })
            .catch(() => {});
    };
}
