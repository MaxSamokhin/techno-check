import Http from '../../service/http';
import {USER_STOP_LOADING, USERS_ERROR_SERVER, USERS_LOADING, USERS_SUCCESS} from './users.constant';
import handleError from '../../service/handleError';
import {toast} from 'react-toastify';

export const userLoading = () => ({
    type: USERS_LOADING,
});

export const userSuccess = (user) => ({
    type: USERS_SUCCESS,
    payload: user
});

export const userSetError = (err) => ({
    type: USERS_ERROR_SERVER,
    payload: err
});

export const userStopLoading = () => ({
    type: USER_STOP_LOADING
});

export function getUserList(selectionId) {
    return (dispatch) => {
        dispatch(userLoading());
        Http.get(`api/admin/testing/selection/${selectionId}/users`)
            .then(users => {

                console.log('getInquirer single');
                console.log(users);

                if (users.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getUserList');
                    console.log(users);

                    handleError(users);
                    dispatch(userStopLoading());
                    return;
                }

                dispatch(userSuccess(users));
            })
            .then(() => dispatch(userStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(userSetError(err));
            });
    };
}

export function loadOneUser(selectionId, user) {
    return (dispatch) => {
        dispatch(userLoading());
        Http.post(`api/admin/testing/selection/${selectionId}/users/invite`, user)
            .then((res) => {

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error loadOneUser');
                    console.log(res);

                    handleError(res);
                    dispatch(userStopLoading());
                }              
                
            })
            .then(() => dispatch(userStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(userSetError(err));
            });
    };
}

export function loadUserFromFile(selectionId, file) {
    return (dispatch) => {
        dispatch(userLoading());
        console.log('loadUserFromFile');
        console.log(file);

        let formData = new FormData();

        formData.append('file', file);
        fetch(`./../../../../../../../../../api/admin/testing/selection/${selectionId}/users`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData

        })
            .then((res) => {
                
                if (!res.ok) {
                    toast.error('Ошибка в загрузке файла');
                }
                
            })
            .then(() => dispatch(userStopLoading()))
        ;
    };
}
