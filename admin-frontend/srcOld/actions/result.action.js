import {
    // RESULT_REQUEST,
    RESULT_GET_INQUIRERS_SUCCESS,
    RESULT_GET_RESULT_FOR_INQUIRER,
    RESULT_CHANGE_VISIBLE_COLLAPSIBLE,
    RESULT_LOADING_RESULT
} from './actions-types';
import Http from '../service/http';


// const resultRequest = () => ({
//     type: RESULT_REQUEST,
// });

const resultGetInquirersSuccess = data => ({
    type: RESULT_GET_INQUIRERS_SUCCESS,
    payload: data
});

const resultGetResultForInquirer = data => ({
    type: RESULT_GET_RESULT_FOR_INQUIRER,
    payload: data
});

const resultChangeVisible = inquirerId => ({
    type: RESULT_CHANGE_VISIBLE_COLLAPSIBLE,
    payload: {inquirerId}
});

const resultLoadingResult = () => ({
    type: RESULT_LOADING_RESULT
});

export function getInquirers() {
    return dispatch => {
        Http.get('api/admin/testing/inquirer')
            .then(res => {
                dispatch(resultGetInquirersSuccess(res));
            });
    };
}

export function getResultByInquirer(inquirerId) {
    return dispatch => {
        dispatch(resultLoadingResult());
        Http.get(`api/admin/results/inquirer/${inquirerId}`)
            .then(res => {
                dispatch(resultGetResultForInquirer(res));
            });
    };
}

export function changeVisible(inquirerId) {
    return dispatch => {
        dispatch(resultLoadingResult());
        dispatch(resultChangeVisible(inquirerId));
    };
}
