import {
    QUESTION_REQUEST,
    QUESTION_SET_FIRST_SUCCESS,
    SET_TEST_FINISH,
    QUESTION_FAILURE, QUESTION_SET_NEW_QUESTION, QUESTION_FINISH_TEST, SHOW_SERVER_ERROR
} from '../actions/actions-types';
import { toast } from 'react-toastify';


const initialState = {
    questionId: null,
    questionTitle: null,
    questionType: null,
    questionAnswers: [],
    isLoadingQuestion: false,
    isFinishTest: true,
    finishedTests: []
};

export default function question(state = initialState, action) {
    switch (action.type) {
        case QUESTION_REQUEST:
            return {
                ...state,
                isLoadingQuestion: true,
                questionId: null,
                questionTitle: null,
                questionType: null,
                questionAnswers: [],
                isFinishTest: true
            };
        case QUESTION_SET_FIRST_SUCCESS: {
            const res = action.payload.res;

            console.log('QUESTION_SET_FIRST_SUCCESS', res);

            return {
                ...state,
                questionId: res.questionId,
                questionTitle: res.questionTitle,
                questionText: res.questionText,
                questionType: res.questionType,
                questionAnswers: res.questionAnswers,
                isLoadingQuestion: false,
                isFinishTest: false
            };
        }
        case QUESTION_SET_NEW_QUESTION: {
            const res = action.payload.res;
            console.log('QUESTION_SET_NEW_QUESTION', res);

            return {
                ...state,
                questionId: res.questionId,
                questionTitle: res.questionTitle,
                questionText: res.questionText,
                questionType: res.questionType,
                questionAnswers: res.questionAnswers,
                isLoadingQuestion: false,
                isFinishTest: false
            };
        }
        case SET_TEST_FINISH: {
            const {testId} = action.payload;
            return {
                ...state,
                finishedTests: [...state.finishedTests, testId],
            };
        }
        case QUESTION_FINISH_TEST: {
            const {testId, msg} = action.payload;

            console.log(QUESTION_FINISH_TEST, 'testId', testId);
            toast.success(msg);

            return {
                ...state,
                isFinishTest: true,
                questionId: null,
                finishedTests: [...state.finishedTests, testId],
            };
        }
        case QUESTION_FAILURE:
            return {
                ...state,
                isLoadingQuestion: false,
            };
        case SHOW_SERVER_ERROR: {
            toast.error(action.payload);
            return {
                ...state,
                isFinishTest: true,
            };
        }
        default:
            return state;
    }
}
