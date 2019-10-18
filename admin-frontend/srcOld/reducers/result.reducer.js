import {
    RESULT_CHANGE_VISIBLE_COLLAPSIBLE,
    RESULT_GET_INQUIRERS_SUCCESS,
    RESULT_GET_RESULT_FOR_INQUIRER,
    RESULT_LOADING_RESULT
} from './../actions/actions-types';
import {getString} from '../service/get-string';

const initialState = {
    isLoadingResultData: false,
    inquirers: [
        {
            inquirerId: 1,
            inquirerTitle: 'defaultTitle',
            isVisible: false
        }
    ],

    inquirersResult: [
        {
            inquirerId: 0,
            inquirerScore: 0,
            user: {
                email: null
            },
            inquirerTitle: null,
            inquirerTests: [
                {
                    testId: 1,
                    testScore: 10,
                    testTitle: '123123',
                    testCategories: [
                        {
                            categoryId: 0,
                            categoryTitle: null,
                            categoryScore: 10
                        }
                    ]
                }
            ]
        }
    ]
};

export default function result(state = initialState, action) {
    switch (action.type) {
        case RESULT_GET_RESULT_FOR_INQUIRER: {
            console.log(RESULT_GET_RESULT_FOR_INQUIRER, action.payload);
            return {
                ...state,
                inquirersResult: action.payload,
                isLoadingResultData: false
            };
        }
        case RESULT_GET_INQUIRERS_SUCCESS: {
            state.inquirers = action.payload.map(({inquirerId, inquirerTitle}) => {
                return {
                    inquirerId,
                    inquirerTitle,
                    isVisible: false
                };
            });

            return {
                ...state,
                isLoadingResultData: false
            };
        }
        case RESULT_LOADING_RESULT: {
            return {
                ...state,
                isLoadingResultData: true
            };
        }
        case RESULT_CHANGE_VISIBLE_COLLAPSIBLE: {
            const {inquirerId} = action.payload;

            const inquirerIndex = state.inquirers.findIndex(element =>
                getString(element.inquirerId) === getString(inquirerId));

            state.inquirers = state.inquirers.reduce((res, elem, index) => {
                console.log('RESULT_CHANGE_VISIBLE_COLLAPSIBLE', index, inquirerIndex, elem.isVisible);

                (index === inquirerIndex) ?
                    elem.isVisible = !elem.isVisible :
                    elem.isVisible = false;

                res.push(elem);
                return res;
            }, []);

            return {
                ...state,
                isLoadingResultData: true
            };
        }
        default:
            return state;
    }
}
