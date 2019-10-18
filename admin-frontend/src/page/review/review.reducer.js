import {
    REVIEW_ERROR_SERVER,
    REVIEW_LOADING_REVIEW,
    REVIEW_STOP_LOADING_REVIEW,
    REVIEW_SUCCESS_LIST
} from './review.constant';

const initialState = {
    isLoadingReview: false,
    errorMsgReview: null,
    listForReview: [],
};

export default function review(state = initialState, action) {
    switch (action.type) {
        case REVIEW_LOADING_REVIEW:
            return {
                ...state,
                isLoadingReview: true,
                errorMsgReview: null,
            };
        case REVIEW_SUCCESS_LIST: {
            return {
                ...state,
                listForReview: action.payload,
                isLoadingReview: false,
                errorMsgReview: null,
            };
        }
        case REVIEW_ERROR_SERVER:
            return {
                ...state,
                errorMsgReview: action.payload,
                isLoadingReview: false,
            };
        case REVIEW_STOP_LOADING_REVIEW:
            return {
                ...state,
                isLoadingReview: false,
            };
        default:
            return state;
    }
}
