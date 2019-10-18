import Http from '../../service/http';
import {
    QUESTION_ANSWERS_SUCCESS,
    QUESTION_DELETE_ANSWER,
    QUESTION_ERROR_SERVER,
    QUESTION_LOADING,
    QUESTION_REDIRECT_TO_CATEGORY,
    QUESTION_STOP_LOADING,
    QUESTION_SUCCESS
} from './question.constant';
import handleError from '../../service/handleError';

export const questionLoading = () => ({
    type: QUESTION_LOADING,
});

export const questionSuccess = (question) => ({
    type: QUESTION_SUCCESS,
    payload: question
});

export const questionSetError = (err) => ({
    type: QUESTION_ERROR_SERVER,
    payload: err
});

export const stopLoading = () => ({
    type: QUESTION_STOP_LOADING
});

export const answersSuccess = (answers) => ({
    type: QUESTION_ANSWERS_SUCCESS,
    payload: answers
});

export const questionRedirectToCategory = () => ({
    type: QUESTION_REDIRECT_TO_CATEGORY
});

export const questionDeleteAnswer = () => ({
    type: QUESTION_DELETE_ANSWER
});

export function getQuestionInfo(questionId) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.get(`api/admin/testing/question/${questionId}`)
            .then(question => {

                console.log('getTestInfo');
                console.log(question);

                if (question.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getQuestionInfo', question);
                    handleError(question);
                    dispatch(stopLoading());
                    return;
                }

                dispatch(questionSuccess(question));
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(questionSetError(err));
            });

    };
}


export function saveQuestion(questionId, question) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.post(`api/admin/testing/question/${questionId}`, question)
            .then(question => {

                console.log('saveQuestion questionAnswers');
                console.log(question);

                if (question.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error saveQuestion', question);
                    handleError(question);
                    dispatch(stopLoading());
                    return;
                }

                dispatch(questionSuccess(question));
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(questionSetError(err));
            });
    };
}

export function createQuestion(categoryId, question) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.post(`api/admin/testing/category/${categoryId}/questions`, question)
            .then(question => {

                console.log('createQuestion');
                console.log(question);

                if (question.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error createQuestion', question);
                    handleError(question);
                    dispatch(stopLoading());
                    return;
                }

                dispatch(questionSuccess(question));
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(questionSetError(err));
            });

    };
}

export function saveAnswers(questionId, answers) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.post(`api/admin/testing/question/${questionId}/answers`, answers)
            .then(answers => {

                if (answers.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error saveAnswers', answers);
                    handleError(answers);
                    dispatch(stopLoading());
                    return;
                }

                console.log('saveAnswer');
                console.log(answers);

                dispatch(answersSuccess([answers]));
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(questionSetError(err));
            });
    };
}

export function deleteQuestion(questionId) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.delete(`api/admin/testing/question/${questionId}`)
            .then(res => {

                console.log('createNewCategory');
                console.log(res);

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error deleteQuestion', res);
                    handleError(res);
                    dispatch(stopLoading());
                    return;
                }

                if (res.status === 'ok') {
                    dispatch(questionRedirectToCategory());
                }
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function deleteAnswer(answerId, answers) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.delete(`api/admin/testing/answer/${answerId}`)
            .then(res => {

                console.log('createNewCategory');
                console.log(res);
                console.log(answers);

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error deleteAnswer', res);
                    handleError(res);
                    dispatch(stopLoading());
                    return;
                }

                const newAnswers = answers.reduce((res, elem) => {
                    if (elem.answerId === answerId) {
                        return res;
                    }
                    res.push(elem);
                    return res;
                }, []);

                console.log(newAnswers);

                if (res.status === 'ok') {
                    dispatch(answersSuccess(newAnswers));
                }
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function getAnswers(questionId) {
    return (dispatch) => {
        dispatch(questionLoading());

        Http.get(`api/admin/testing/question/${questionId}/answers`)
            .then(answers => {

                if (answers.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getAnswers', answers);
                    handleError(answers);
                    dispatch(stopLoading());
                    return;
                }

                console.log('saveQuestion');
                console.log(answers);

                dispatch(answersSuccess(answers));
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(questionSetError(err));
            });
    };
}
