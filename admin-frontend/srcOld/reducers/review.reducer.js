import {
    REVIEW_CHANGE_SCORE,
    REVIEW_CHANGE_VISIBLE_COLLAPSIBLE,
    REVIEW_GET_ANSWER,
    REVIEW_GET_INQUIRERS,
    REVIEW_LOADING_REVIEW,
    REVIEW_SAVE_SCORE
} from './../actions/actions-types';

import {getString} from '../service/get-string';
import { toast } from 'react-toastify';


const initialState = {
    inquirers: [
        {
            inquirerId: 0,
            inquirerTitle: null,
            isVisible: false
        }
    ],
    isLoadingReviewData: false,
    answersForReview: [
        {
            answers: [{
                userAnswerId: null,
                answerText: '',
                answerScore: 0
            }],
            questionId: null,
            questionManual: null,
            questionTitle: '',
            questionType: 'TEXT',
            user: {
                email: null
            },
            userQuestionId: null
        }
    ]
};

export default function review(state = initialState, action) {
    switch (action.type) {
        case REVIEW_GET_INQUIRERS: {
            state.inquirers = action.payload.data.map(({inquirerId, inquirerTitle, isVisible}) => {
                return {
                    inquirerId,
                    inquirerTitle,
                    isVisible: isVisible ? isVisible : false
                };
            });

            return {
                ...state,
                isLoadingResultData: false
            };
        }
        case REVIEW_CHANGE_VISIBLE_COLLAPSIBLE: {
            const {inquirerId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId));

            console.log(REVIEW_CHANGE_VISIBLE_COLLAPSIBLE, inquirerIndex);

            state.inquirers = state.inquirers.map((elem, index) => {

                console.log('RESULT_CHANGE_VISIBLE_COLLAPSIBLE index, inquirerIndex, elem.isVisible',
                    index, inquirerIndex, elem.isVisible);

                (index === inquirerIndex) ?
                    elem.isVisible = !elem.isVisible :
                    elem.isVisible = false;

                return elem;
            });

            console.log('RESULT_CHANGE_VISIBLE_COLLAPSIBLE', state.inquirers);

            return {
                ...state,
                inquirers: [...state.inquirers],
                isLoadingResultData: true
            };
        }
        case REVIEW_GET_ANSWER: {
            return {
                ...state,
                answersForReview: action.payload
            };
        }
        case REVIEW_LOADING_REVIEW: {
            return {
                ...state,
                isLoadingResultData: true
            };
        }
        case REVIEW_CHANGE_SCORE: {
            const {value, questionId} = action.payload;

            console.log(REVIEW_CHANGE_SCORE, value, questionId);

            const questionIndex = state.answersForReview.findIndex(element =>
                getString(element.questionId) === getString(questionId)
            );

            state.answersForReview[questionIndex].answers[0].answerScore = getString(value);

            return {
                ...state,
                answersForReview: [...state.answersForReview]
            };
        }
        case REVIEW_SAVE_SCORE: {
            console.log(REVIEW_SAVE_SCORE);
            console.log(toast);
                // toast.success('Данные успешно сохранены');
            return {
                ...state
            };
        }
        default:
            return state;
    }
}
