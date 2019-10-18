import {
    // USER_REQUEST,
    QUESTION_SET_FIRST_SUCCESS,
    USER_INFO_SUCCESS,
    SHOW_SERVER_ERROR
} from '../actions/actions-types';

import {
    setTestTitle
} from '../actions/test.action';

import Http from '../service/http.js';


const userInfoSuccess = (res) => ({
    type: USER_INFO_SUCCESS,
    payload: {
        user: res.user,
        userSelection: res.userSelection
    }
});

const setFirstQuestion = (res) => ({
    type: QUESTION_SET_FIRST_SUCCESS,
    payload: {
        res,
    }
});

const showServerError = (error) => ({
    type: SHOW_SERVER_ERROR,
    payload: error
});

export function getUserInfo(token) {
    return dispatch => {
        Http.post('api/auth/token', {token}).then(res => {
            // for (const test in res.user.userfinishedTests) {
            //     Http.post(`api/testing/test/${userTestId}/start`)
            //     .then(res => {
            //         if (res.status === 'finished') {
            //             this.props.setFinishTest(userTestId);
            //         }
            //     });
            // }
            dispatch(userInfoSuccess(res));
            console.log('getUserInfo');
            console.log(res);
        });
    };
}

export function startTest(testId, testTitle) {
    return dispatch => {

        console.log('startTest', testId);

        Http.post(`api/testing/test/${testId}/start`).then(res => {
            if (res.error) {
                dispatch(showServerError(res.message));
                return;
            }
            dispatch(setFirstQuestion(res));
            dispatch(setTestTitle(testTitle));
        });
    };
}
