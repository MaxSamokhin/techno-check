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
    QUESTION_SET_ANSWER, QUESTION_SAVE_SUCCESS,
    QUESTION_NOT_VALID, QUESTION_CHANGE_CHECKBOX
} from './../actions/actions-types';

import {TEST} from '../constants/questyon.type.js';
import {toast} from 'react-toastify';

const initialState = {
    isLoadingQuestion: false,
    errorMsgQuestion: null,
    questionTitle: '',
    questionType: TEST,
    checkManual: false,
    answers: [
        {
            answerId: '_id',
            answerTitle: '',
            answerScore: 0
        }
    ]
};

export default function question(state = initialState, action) {
    switch (action.type) {
        case QUESTION_REQUEST:
            return {
                ...state,
                isLoadingQuestion: true,

                questionTitle: '',
                questionType: TEST,
                answers: [
                    {
                        answerId: '_id',
                        answerTitle: '',
                        answerScore: 0
                    }
                ]
            };
        case QUESTION_SUCCESS: {

            console.log('QUESTION_SUCCESS QUESTION_SUCCESS');
            console.log(action.payload);

            return {
                ...state,
                questionTitle: action.payload.questionTitle,
                questionType: action.payload.questionType,
                answers: action.payload.answers,
                isLoadingQuestion: false
            };
        }
        case QUESTION_ERROR_SERVER:
            return {
                ...state,
                errorMsgQuestion: action.payload,
                isLoadingQuestion: false,
            };
        case QUESTION_CHANGE_TITLE:
            return {
                ...state,
                questionTitle: action.payload.title,
            };
        case QUESTION_ADD_ITEM: {
            const {answerId, answerScore, answerTitle} = action.payload;
            state.answers.push({answerId, answerScore, answerTitle});
            return {
                ...state,
                answers: [...state.answers]
            };
        }
        case QUESTION_CHANGE_CHECKBOX: {
            console.log('QUESTION_CHANGE_CHECKBOX', action.payload);

            return {
                ...state,
                checkManual: !state.checkManual
            };
        }
        case QUESTION_DELETE_ITEM: {
            const {answerId} = action.payload;
            const newAnswers = state.answers.reduce((res, elem) => {
                if (elem.answerId + '' !== answerId + '') {
                    res.push(elem);
                }

                return res;
            }, []);

            console.log('QUESTION_DELETE_ITEM reducer', answerId, state.answers, newAnswers);

            return {
                ...state,
                answers: newAnswers
            };
        }
        case QUESTION_CHANGE_TYPE:
            console.log('QUESTION_CHANGE_TYPE reducer', action.payload.type);
            return {
                ...state,
                questionType: action.payload.type
            };
        case QUESTION_CHANGE_ANSWER_ITEM: {
            const {answerId, value} = action.payload;

            console.log(QUESTION_CHANGE_ANSWER_ITEM, answerId, value, state.answers);

            let newAnswers = state.answers.reduce((res, elem) => {
                if (elem.answerId + '' === answerId + '') {
                    elem.answerTitle = value;
                }

                res.push(elem);
                return res;
            }, []);

            console.log('QUESTION_CHANGE_ANSWER_ITEM', newAnswers);

            return {
                ...state,
                answers: [...newAnswers]
            };
        }
        case QUESTION_CHANGE_SCORE_ITEM: {
            const {answerId, value} = action.payload;
            const newAnswers = state.answers.reduce((res, elem) => {
                if (elem.answerId + '' === answerId + '') {
                    elem.answerScore = value;
                }

                res.push(elem);
                return res;
            }, []);

            return {
                ...state,
                answers: newAnswers
            };
        }
        case QUESTION_SET_EMPTY_QUESTION: {
            const {questionTitle, questionType, answers} = action.payload;
            return {
                ...state,
                questionTitle: questionTitle,
                questionType: questionType,
                answers: answers
            };
        }
        case QUESTION_SET_ANSWER: {
            console.log('QUESTION_SET_ANSWER reducer', action.payload.answers);

            return {
                ...state,
                answers: [...action.payload.answers]
            };
        }
        case QUESTION_SAVE_SUCCESS: {
            toast.success(action.payload.msg);
            return {
                ...state,
            };
        }
        case QUESTION_NOT_VALID: {
            toast.error(action.payload.msg);
            return {
                ...state
            };
        }
        default:
            return state;
    }
}
