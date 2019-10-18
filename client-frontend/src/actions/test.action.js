import {
    TEST_REQUEST,
    TEST_SUCCESS,
    SET_TEST_TITLE
    // TEST_FAILURE
} from '../actions/actions-types';

const testRequest = () => ({
    type: TEST_REQUEST
});

export const setTestTitle = (title) => ({
    type: SET_TEST_TITLE,
    payload: title
});

const testSuccess = (data) => ({
    type: TEST_SUCCESS,
    payload: data
});

// export function testSetTitle(title) {
//     return dispatch
// }

// export function setTestTitle(title) {
//     return dispatch => {
//         dispatch(setTitle(title));
//     };
// }

export function getTest() {
    return dispatch => {
        dispatch(testRequest());
        setTimeout(() => dispatch(testSuccess([
            {
                testId: '123123',
                testTitle: 'Тест1',
                isStart: true,
                isFinished: false
            },
            {
                testId: '78678678',
                testTitle: 'Тест2',
                isStart: true,
                isFinished: false
            }
        ])), 500);
    };
}
