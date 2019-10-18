import {
    // QUESTION_REQUEST,
    // QUESTION_SUCCESS,
    // QUESTION_FAILURE
    QUESTION_SET_NEW_QUESTION,
    QUESTION_FINISH_TEST,
    SHOW_SERVER_ERROR
} from '../actions/actions-types';
import Http from '../service/http';

const setNewQuestion = (res) => ({
    type: QUESTION_SET_NEW_QUESTION,
    payload: {
        res
    }
});

const questionFinishTest = (testId) => ({
    type: QUESTION_FINISH_TEST,
    payload: {
        testId,
        msg: 'Тест успешно пройден'
    }
});

const showServerError = (error) => ({
    type: SHOW_SERVER_ERROR,
    payload: error
});

export function setFinishTest(testId) {
    return dispatch => {
        dispatch(questionFinishTest(testId));
    };
}

export function nextQuestion(testId, questionId, {multiplyAnswer, textAnswerRequest, testAnswer}) {
    return (dispatch) => {
        // dispatch(questionRequest());

        console.log('nextQuestion testId', testId);

        Http.post(`api/testing/question/${questionId}`, {
            answerId: testAnswer,
            answers: multiplyAnswer,
            answer: textAnswerRequest
        })
            .then(res => {
                console.log('nextQuestion', res);

                if (res.error) {
                    dispatch(showServerError(res.message));
                    return;
                }

                if (res.status === 'finished') {

                    console.log('finished nextQuestion testId', testId);

                    dispatch(questionFinishTest(testId));
                } else {
                    dispatch(setNewQuestion(res));
                }
            });
    };
}
