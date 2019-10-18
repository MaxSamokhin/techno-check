import {
    REVIEW_HOME_SUCCESS,
    REVIEW_HOME_LOADING_REVIEW,
    REVIEW_HOME_STOP_LOADING
} from './review-home.constant.js';
import Http from '../../service/http';
import handleError from '../../service/handleError';

const reviewSuccess = data => ({
    type: REVIEW_HOME_SUCCESS,
    payload: data
});

const reviewLoading = () => ({
    type: REVIEW_HOME_LOADING_REVIEW
});

const reviewStopLoading = () => ({
    type: REVIEW_HOME_STOP_LOADING
});

export function getReviewSelection() {
    return dispatch => {
        dispatch(reviewLoading());
        Http.get('api/admin/review/selections')
            .then(res => {

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getReviewSelection', res);
                    handleError(res);
                    dispatch(reviewStopLoading());
                    return;
                }

                console.log('getResultBySelection');
                console.log(res);

                dispatch(reviewSuccess(res));
            })
            .then(() => dispatch(reviewStopLoading()));
    };
}
