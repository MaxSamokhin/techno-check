import {
    IS_RANDOM_QUESTIONS,
    IS_ALL_QUESTIONS,
    IS_NOT_RANDOM_QUESTIONS,
    IS_NOT_ALL_QUESTIONS
} from './type-question-service.constant.js';

const isRandomQuestion = () => ({
    type: IS_RANDOM_QUESTIONS
});

const isAllQuestions = () => ({
    type: IS_ALL_QUESTIONS
});

const isNotRandomQuestion = () => ({
    type: IS_NOT_RANDOM_QUESTIONS
});

const isNotAllQuestions = () => ({
    type: IS_NOT_ALL_QUESTIONS
});

export function setAllQuestion() {
    return (dispatch) => {
        dispatch(isAllQuestions());
    };
}

export function setRandomQuestion() {
    return (dispatch) => {
        dispatch(isRandomQuestion());
    };
}

export function setNotAllQuestion() {
    return (dispatch) => {
        dispatch(isNotAllQuestions());
    };
}

export function setNotRandomQuestion() {
    return (dispatch) => {
        dispatch(isNotRandomQuestion());
    };
}
