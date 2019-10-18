import {REVIEW_LOADING_REVIEW, REVIEW_STOP_LOADING_REVIEW, REVIEW_SUCCESS_LIST} from './review.constant.js';
import Http from '../../service/http';
import handleError from '../../service/handleError';

const reviewGetListSuccess = data => ({
    type: REVIEW_SUCCESS_LIST,
    payload: data
});

const reviewLoadingResult = () => ({
    type: REVIEW_LOADING_REVIEW
});

const reviewStopLoadingReview = () => ({
    type: REVIEW_STOP_LOADING_REVIEW
});

export function getReviewListBySelection(selectionId) {
    return dispatch => {
        dispatch(reviewLoadingResult());
        Http.get(`api/admin/review/selection/${selectionId}`)
            .then(res => {

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getReviewListBySelection', res);
                    handleError(res);
                    dispatch(reviewStopLoadingReview());

                    return;
                }


                console.log('getResultBySelection');
                console.log(res);

                dispatch(reviewGetListSuccess(res));
            })
            .then(() => dispatch(reviewStopLoadingReview()));
    };
}

export function setScoreForReview(userQuestionId, score) {
    return dispatch => {
        dispatch(reviewLoadingResult());

        console.log('setScoreForReview');
        console.log(score);

        Http.post(`api/admin/review/answer/${userQuestionId}/score`, score)
            .then(res => {


                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error setScoreForReview', res);
                    handleError(res);
                    dispatch(reviewStopLoadingReview());
                    return;
                }

                console.log('setScoreForReview');
                console.log(res);

                // dispatch(reviewGetResultForSelection(res));
            })
            .then(() => dispatch(reviewStopLoadingReview()));
    };
}
