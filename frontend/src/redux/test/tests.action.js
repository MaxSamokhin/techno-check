import {
    TEST_LOADING,
    TEST_SUCCESS,
    TEST_STOP_LOADING
} from './test.constant';

import Http from 'service/http';

const testsLoading = () => ({
    type: TEST_LOADING,
});

const testsStopLoading = () => ({
    type: TEST_STOP_LOADING
});

const testsSuccess = (tests) => ({
    type: TEST_SUCCESS,
    payload: tests
});

export function getTests() {
    return (dispatch) => {
        dispatch(testsLoading());

        Http.get(`api/review/tests`)
            .then(tests => {
                dispatch(testsSuccess(tests));
            })
            .then(() => dispatch(testsStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(menuSetError(err));
            });
    };
}
