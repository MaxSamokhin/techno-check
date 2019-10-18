import {
    REVIEW_LOADING_REVIEW,
    REVIEW_GET_INQUIRERS,
    REVIEW_CHANGE_VISIBLE_COLLAPSIBLE,
    REVIEW_GET_ANSWER,
    REVIEW_CHANGE_SCORE,
    REVIEW_SAVE_SCORE
} from './actions-types';
import Http from '../service/http';


const reviewGetInquirersSuccess = (data) => ({
    type: REVIEW_GET_INQUIRERS,
    payload: {
        data
    }
});

const reviewLoadingReview = () => ({
    type: REVIEW_LOADING_REVIEW
});

const reviewChangeVisible = (inquirerId) => ({
    type: REVIEW_CHANGE_VISIBLE_COLLAPSIBLE,
    payload: {inquirerId}
});

const reviewGetAnswer = (data) => ({
    type: REVIEW_GET_ANSWER,
    payload: data
});

const reviewChangeScore = (data) => ({
    type: REVIEW_CHANGE_SCORE,
    payload: data
});

const reviewSaveScore = () => ({
    type: REVIEW_SAVE_SCORE,
});

export function getInquirers() {
    return dispatch => {
        Http.get('api/admin/review/inquirer')
            .then(res => {
                dispatch(reviewGetInquirersSuccess(res));
            });
    };
}

export function getReviewAnswer(inquirerId) {
    return dispatch => {
        dispatch(reviewLoadingReview());
        Http.get(`api/admin/review/inquirer/${inquirerId}`)
            .then(res => {
                dispatch(reviewGetAnswer(res));
            });
    };
}

export function changeVisible(inquirerId) {
    return dispatch => {
        dispatch(reviewChangeVisible(inquirerId));
    };
}

export function saveScore(questionId, userAnswerId, score) {
    return dispatch => {
        console.log('saveScore reducer', questionId, userAnswerId, score);
        Http.post(`api/admin/review/answer/${userAnswerId}/score`, {answerScore: score})
            .then(res => console.log(res));
        dispatch(reviewSaveScore());
    };
}

export function changeScore(value, questionId) {
    return dispatch => {
        dispatch(reviewChangeScore({value, questionId}));
    };
}
