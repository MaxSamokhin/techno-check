import {
    QUESTION_REQUEST,
    QUESTION_SUCCESS,
    QUESTION_ERROR_SERVER,
    QUESTION_CHANGE_TITLE,
    QUESTION_CHANGE_TYPE,
    QUESTION_ADD_ITEM,
    QUESTION_DELETE_ITEM,
    QUESTION_CHANGE_ANSWER_ITEM,
    QUESTION_CHANGE_SCORE_ITEM,
    QUESTION_SET_EMPTY_QUESTION,
    QUESTION_SET_ANSWER,
    QUESTION_SAVE_SUCCESS,
    QUESTION_NOT_VALID,
    QUESTION_CHANGE_CHECKBOX
} from './actions-types';

import Http from '../service/http';
import {TEST, VIDEO} from '../constants/questyon.type';
import {isValidQuestion} from '../service/validator';

const questionRequest = () => ({
    type: QUESTION_REQUEST,
});

export const questionSuccess = (data) => ({
    type: QUESTION_SUCCESS,
    payload: data
});

const questionServerError = msg => ({
    type: QUESTION_ERROR_SERVER,
    payload: msg
});

const questionChangeTitle = title => ({
    type: QUESTION_CHANGE_TITLE,
    payload: {
        title
    }
});

const questionChangeType = type => ({
    type: QUESTION_CHANGE_TYPE,
    payload: {
        type
    }
});

const questionAddItem = data => ({
    type: QUESTION_ADD_ITEM,
    payload: {
        answerId: data.answerId,
        answerScore: 0,
        answerTitle: ''
    }
});

const questionDeleteItem = data => ({
    type: QUESTION_DELETE_ITEM,
    payload: {
        answerId: data.answerId,
    }
});

const questionChangeAnswerItem = data => ({
    type: QUESTION_CHANGE_ANSWER_ITEM,
    payload: {
        answerId: data.answerId,
        value: data.value
    }
});

const questionChangeScoreItem = data => ({
    type: QUESTION_CHANGE_SCORE_ITEM,
    payload: {
        answerId: data.answerId,
        value: data.value
    }
});

const questionSetEmptyQuestion = ({questionTitle, questionType, answers}) => ({
    type: QUESTION_SET_EMPTY_QUESTION,
    payload: {
        questionTitle,
        questionType,
        answers
    }
});

const questionSetAnswer = data => ({
    type: QUESTION_SET_ANSWER,
    payload: {
        answers: data
    }
});

const questionSaveSuccess = () => ({
    type: QUESTION_SAVE_SUCCESS,
    payload: {
        msg: 'Данные вопроса успешно сохранены'
    }
});

const isNotValidQuestion = () => ({
    type: QUESTION_NOT_VALID,
    payload: {
        msg: 'Проверьте данные вопроса, они введены некорректно'
    }
});

const questionChangeCheckbox = (data) => ({
    type: QUESTION_CHANGE_CHECKBOX,
    payload: {
        data
    }
});

export function changeCheckbox(e) {
    return dispatch => {
        dispatch(questionChangeCheckbox(e.target));
    };
}

export function deleteItem(questionId, categoryId, answerId) {

    console.log('deleteItem', questionId, categoryId, answerId);

    return dispatch => {

        if (answerId.substr(0, 1) === '_') {
            dispatch(questionDeleteItem({questionId, answerId}));
            return;
        }

        Http.delete(`api/admin/testing/answer/${answerId}`)
            .then(() => {
                getQuestion(questionId, categoryId);
            });
        dispatch(questionDeleteItem({questionId, answerId}));

        console.log('deleteItem', questionId, categoryId, answerId);
    };
}

export function addItem(questionId, categoryId, answerId) {
    return dispatch => {
        // dispatch(questionRequest());
        console.log('addItem addItem', questionId, categoryId, answerId);
        dispatch(questionAddItem({questionId, categoryId, answerId}));
    };
}

export function changeQuestion(questionId, categoryId, {answers, questionTitle, questionType, checkManual}) {
    console.log('answers', answers);


    return dispatch => {

        let newAnswers = answers.reduce((res, elem) => {
            if (String(elem.answerId).substr(0, 1) !== '_') {
                res.push(elem);
                return res;
            }

            res.push({answerScore: elem.answerScore, answerTitle: elem.answerTitle});
            return res;
        }, []);

        console.log('saveQuestion actions:', newAnswers, questionTitle, questionType);

        console.dir('changeQuestion', newAnswers);

        if (!isValidQuestion(questionTitle, questionType, answers)) {
            dispatch(isNotValidQuestion());
            return;
        }

        Http.post(`api/admin/testing/question/${questionId}`, {
            answers: (questionType === 'TEXT' && !checkManual) ? undefined : newAnswers,
            questionTitle,
            questionType,
            questionManualCheck: questionType === 'TEXT' ? checkManual : undefined
        })
            .then(() => dispatch(questionSaveSuccess()));

        console.log('changeQuestion', questionId, categoryId, newAnswers, questionTitle, questionType);
    };
}

export function saveQuestion(questionId, categoryId, {answers, questionTitle, questionType, checkManual}) {
    return dispatch => {

        if (!isValidQuestion(questionTitle, questionType, answers)) {
            dispatch(isNotValidQuestion());
            return;
        }

        console.log('saveQuestion', questionType, checkManual);

        dispatch(questionRequest());
        Http.post(`api/admin/testing/category/${categoryId}/questions`, {
            questionTitle,
            questionType,
            answers: (questionType === 'TEXT' && !checkManual) ? undefined : answers,
            questionManualCheck: questionType === 'TEXT' ? checkManual : undefined
        })
            .then(() => dispatch(questionSaveSuccess()));
    };
}

export function changeType(e) {
    console.log(e.target.value);
    return dispatch => {
        const type = e.target.value;
        if (type === VIDEO) dispatch(setAnswer([]));
        dispatch(questionChangeType(e.target.value + ''));
    };
}

export function changeTitle(e) {
    return dispatch => {
        dispatch(questionChangeTitle(e));
    };
}

export function changeAnswerItem(e, answerId) {
    console.log('changeAnswerItem', e.target.value, answerId);
    return dispatch => {
        dispatch(questionChangeAnswerItem({value: e.target.value, answerId: answerId}));
    };
}

export function changeScoreItem(e, answerId) {
    console.log('changeScoreItem', e.target.value, answerId);
    return dispatch => {
        dispatch(questionChangeScoreItem({value: e.target.value, answerId: answerId}));
    };
}

export function getQuestion(questionId, categoryId) {
    return dispatch => {
        dispatch(questionRequest());
        console.log(questionId, categoryId);
        Http.get(`api/admin/testing/question/${questionId}`)
            .then(res => {
                dispatch(questionSuccess(res));
            })
            .catch(err => {
                dispatch(questionServerError(err));
            });
    };
}

export function setEmptyQuestion() {
    return dispatch => {
        dispatch(questionSetEmptyQuestion({
            questionTitle: '',
            questionType: TEST,
            answers: [
                {
                    answerId: '_id',
                    answerTitle: '',
                    answerScore: 0
                }
            ]
        }));
    };
}

export function setAnswer(data) {
    return dispatch => {
        console.log('setAnswer', data);
        dispatch(questionSetAnswer(data));
    };
}
