import {
    REVIEW_HOME_SUCCESS,
    REVIEW_HOME_LOADING_REVIEW,
    REVIEW_HOME_STOP_LOADING
} from './review-home.constant';


const initialState = {
    isLoadingReview: false,
    errorMsgReview: null,
    listForReviewHome: [],
};

export default function reviewHome(state = initialState, action) {
    switch (action.type) {
        case REVIEW_HOME_STOP_LOADING:
            return {
                ...state,
                isLoadingReview: true,
                errorMsgReview: null,
            };
        case REVIEW_HOME_SUCCESS: {
            return {
                ...state,
                listForReviewHome: action.payload,
                isLoadingReview: false,
                errorMsgReview: null,
            };
        }
        case REVIEW_HOME_LOADING_REVIEW:
            return {
                ...state,
                errorMsgReview: action.payload,
                isLoadingReview: false,
            };
        default:
            return state;
    }
}
