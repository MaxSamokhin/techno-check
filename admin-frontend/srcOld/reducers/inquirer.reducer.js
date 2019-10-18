import {
    INQUIRER_REQUEST,
    INQUIRER_SUCCESS,
    INQUIRER_ERROR_SERVER,
    INQUIRER_ADD,
    TEST_ADD_SUCCESS,
    CATEGORY_ADD_SUCCESS,
    INQUIRER_DELETE_TEST,
    INQUIRER_DELETE_CATEGORY,
    INQUIRER_DELETE_INQUIRER,
    INQUIRER_DELETE_QUESTION,
    INQUIRER_NOT_ALL_DATA,
    INQUIRER_SAVE_INQUIRER_SUCCESS,
    INQUIRER_NOT_ALL_VALID_DATA_TEST,
    INQUIRER_SAVE_TEST_SUCCESS,
    INQUIRER_SAVE_CATEGORY_SUCCESS,
    INQUIRER_NOT_VALID_DATA_CATEGORY,
    INQUIRER_NOT_FOUND_USER_FILE,
    INQUIRER_DOWNLOAD_USER_DATA_SUCCESS,
    INQUIRER_IS_NOT_VALID_TIME
} from './../actions/actions-types';

import { toast } from 'react-toastify';
import {getString} from '../service/get-string';

const initialState = {
    isLoadingCourse: false,
    inquirers: [
        {
            inquirerId: 0,
            // inquirerFileUser: null,
            tests: [
                {
                    testId: 0,
                    categories: [
                        {
                            categoryId: 0,
                            questions: []
                        }
                    ]
                }
            ]
        }
    ],
    errorMsg: null
};

export default function inquirerqweq(state = initialState, action) {
    switch (action.type) {
        case INQUIRER_REQUEST:
            return {
                ...state,
                isLoadingCourse: true,
            };
        case INQUIRER_SUCCESS:
            return {
                ...state,
                inquirers: action.payload,
                isLoadingCourse: false
            };
        case INQUIRER_ERROR_SERVER:
            toast.error('Нет подключения к сети');
            return {
                ...state,
                errorMsg: action.payload,
                isLoadingCourse: false,
            };
        case INQUIRER_ADD:
            return {
                ...state,
                isLoadingCourse: false,
                inquirers: state.inquirers.concat(action.payload)
            };
        case TEST_ADD_SUCCESS: {
            const {data, inquirerId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId)
            );

            state.inquirers[inquirerIndex].tests.push(data);

            return {
                ...state,
                isLoadingCourse: false,
                inquirers: [...state.inquirers]
            };
        }
        case CATEGORY_ADD_SUCCESS: {
            const {data, inquirerId, testId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId)
            );

            const testIndex = state.inquirers[inquirerIndex].tests.findIndex(element =>
                getString(element.testId) === getString(testId));

            state.inquirers[inquirerIndex].tests[testIndex].categories.push(data);

            return {
                ...state,
                isLoadingCourse: false,
                inquirers: [...state.inquirers]
            };
        }
        case INQUIRER_DELETE_TEST: {
            const {inquirerId, testId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId)
            );

            const newTests = state.inquirers[inquirerIndex].tests.filter(elem =>
                getString(elem.testId) !== getString(testId));

            state.inquirers[inquirerIndex].tests = newTests;

            return {
                ...state,
                inquirers: [...state.inquirers]
            };
        }
        case INQUIRER_DELETE_CATEGORY: {
            const {inquirerId, testId, categoryId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId)
            );

            const testIndex = state.inquirers[inquirerIndex].tests.findIndex(element =>
                getString(element.testId) === getString(testId));

            const newCategory = state.inquirers[inquirerIndex].tests[testIndex].categories.filter(elem =>
                getString(elem.categoryId) !== getString(categoryId));

            state.inquirers[inquirerIndex].tests[testIndex].categories = newCategory;
            return {
                ...state,
                inquirers: [...state.inquirers]
            };
        }
        case INQUIRER_DELETE_INQUIRER: {
            const inquirerId = action.payload;

            const newInquirer = state.inquirers.filter(elem =>
                getString(elem.inquirerId) !== getString(inquirerId));
            state.inquirers = newInquirer;

            return {
                ...state,
                inquirers: [...state.inquirers]
            };
        }

        case INQUIRER_DELETE_QUESTION: {
            const {inquirerId, testId, categoryId, questionId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId));

            const testIndex = state.inquirers[inquirerIndex].tests.findIndex(element =>
                getString(element.testId) === getString(testId));

            const categoryIndex = state.inquirers[inquirerIndex].tests[testIndex].categories.findIndex(elem =>
                getString(elem.categoryId) === getString(categoryId));

            const newQuestion = state.inquirers[inquirerIndex].tests[testIndex].categories[categoryIndex].questions.filter(elem =>
                getString(elem.questionId) !== getString(questionId));

            state.inquirers[inquirerIndex].tests[testIndex].categories[categoryIndex].questions = newQuestion;

            return {
                ...state,
                inquirers: [...state.inquirers]
            };
        }
        case INQUIRER_NOT_ALL_DATA: {
            // toast.info(action.payload.msg);
            return {
                ...state,
            };
        }
        case INQUIRER_SAVE_INQUIRER_SUCCESS: {
            toast.success(action.payload.msg);
            return {
                ...state
            };
        }
        case INQUIRER_NOT_ALL_VALID_DATA_TEST: {
            toast.info(action.payload.msg);
            return {
                ...state
            };
        }
        case INQUIRER_SAVE_TEST_SUCCESS: {
            toast.success(action.payload.msg);
            return {
                ...state
            };
        }
        case INQUIRER_SAVE_CATEGORY_SUCCESS: {
            toast.success(action.payload.msg);
            return {
                ...state,
            };
        }
        case INQUIRER_NOT_VALID_DATA_CATEGORY: {
            toast.error(action.payload.msg);
            return {
                ...state,
            };
        }
        case INQUIRER_NOT_FOUND_USER_FILE: {
            toast.error(action.payload.msg);
            return {
                ...state,
            };
        }
        case INQUIRER_DOWNLOAD_USER_DATA_SUCCESS: {
            toast.success(action.payload.msg);
            return {
                ...state,
            };
        }
        case INQUIRER_IS_NOT_VALID_TIME: {
            toast.error(action.payload.msg);
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
