import {
    SELECTION_CLEAR_TESTS,
    SELECTION_ERROR_SERVER,
    SELECTION_LOADING,
    SELECTION_REDIRECT_TO_HOME,
    SELECTION_SET_ALL_TEST_SUCCESS,
    SELECTION_SET_ERROR,
    SELECTION_SET_MENU_DATA_SUCCESS,
    SELECTION_SET_TEST_SUCCESS,
    SELECTION_STOP_LOADING,
    SELECTION_SUCCESS
} from './selection.constant';
import Http from '../../service/http';
import handleError from '../../service/handleError';

const selectionLoading = () => ({
    type: SELECTION_LOADING,
});

export const selectionSuccess = (selection) => ({
    type: SELECTION_SUCCESS,
    payload: selection
});

const selectionSetError = (err) => ({
    type: SELECTION_ERROR_SERVER,
    payload: err
});

const selectionSetTestsSuccess = (tests) => ({
    type: SELECTION_SET_TEST_SUCCESS,
    payload: tests
});

const selectionRedirectToHome = () => ({
    type: SELECTION_REDIRECT_TO_HOME
});

const selectionStopLoading = () => ({
    type: SELECTION_STOP_LOADING
});

const selectionSetAllTestsSuccess = (tests) => ({
    type: SELECTION_SET_ALL_TEST_SUCCESS,
    payload: tests
});

const selectionSetMenuDataSuccess = (menuData) => ({
    type: SELECTION_SET_MENU_DATA_SUCCESS,
    payload: menuData
});


const selectionClearTests = () => ({
    type: SELECTION_CLEAR_TESTS,
});

const setErrorSelection = (err) => ({
    type: SELECTION_SET_ERROR,
    payload: err
});

export function getSelectionInfo(selectionId) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.get(`api/admin/testing/selection/${selectionId}`)
            .then(selection => {

                if (selection.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getSelectionInfo');
                    console.log(selection);
                    handleError(selection);
                    dispatch(selectionStopLoading());

                    return;
                }

                console.log('getInquirer single');
                console.log(selection);


                dispatch(selectionSuccess(selection));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                dispatch(selectionSetError(err));
            });
    };
}

export function saveSelection(selection, selectionId) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.post(`api/admin/testing/selection/${selectionId}`, selection)
            .then(res => {

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error saveSelection');
                    console.log(res);
                    handleError(res);
                    dispatch(selectionStopLoading());
                    return;
                }

                console.log('saveInquirer');
                console.log(res);
                dispatch(selectionSuccess(res));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(selectionSetError(err));
            });
    };
}


export function createNewSelection(selection) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.post('api/admin/testing/selection', selection)
            .then(res => {

                console.log('createNewInquirer');
                console.log(res);
                if (res.status === 'error') {
                    if (res.hasOwnProperty('selectionTitle')) {
                        dispatch(setErrorSelection(res.selectionTitle[0]));
                    }

                    if (res.hasOwnProperty('selectionStartDate')) {
                        dispatch(setErrorSelection(res.selectionStartDate[0]));
                    }

                    handleError(res);
                    dispatch(selectionStopLoading());

                    return;
                }

                dispatch(selectionSuccess(res));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                console.log('err');
                console.log(err);
                // dispatch(selectionSetError(err));
            });
    };
}

export function clearTestsForSelection() {
    return (dispatch) => {
        dispatch(selectionClearTests());
    };
}

export function deleteSelection(selectionId) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.delete(`api/admin/testing/selection/${selectionId}`)
            .then(res => {

                console.log('deleteSelection');
                console.log(res);

                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error deleteSelection');
                    console.log(res);
                    handleError(res);
                    dispatch(selectionStopLoading());

                    return;
                }

                if (res.status === 'ok') {
                    dispatch(selectionRedirectToHome());
                }
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                console.log(err);
                dispatch(selectionSetError(err));
            });
    };
}

export function getTestsForSelection(selectionId) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.get(`api/admin/testing/selection/${selectionId}/tests`)
            .then(tests => {

                if (tests.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getTestsForSelection');
                    console.log(tests);

                    handleError(tests);
                    dispatch(selectionStopLoading());

                    return;
                }

                console.log('getTestsForSelection');
                console.log(tests);

                dispatch(selectionSetTestsSuccess(tests));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                dispatch(selectionSetError(err));
            });
    };
}

export function getAllTest() {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.get('api/admin/testing/tests')
            .then(tests => {

                if (tests.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getAllTest');
                    console.log(tests);

                    return;
                }

                console.log('getTestsForSelection');
                console.log(tests);

                dispatch(selectionSetAllTestsSuccess(tests));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                dispatch(selectionSetError(err));
            });
    };
}

export function setTestExisting(selectionId, testId) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.post(`api/admin/testing/selection/${selectionId}/test/add/${testId}`)
            .then(tests => {

                if (tests.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error setTestExisting');
                    console.log(tests);

                    return;
                }

                console.log('getTestsForSelection');
                console.log(tests);

                dispatch(selectionSetTestsSuccess(tests));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                dispatch(selectionSetError(err));
            });
    };
}

export function getMenuData(selectionId) {
    return (dispatch) => {
        dispatch(selectionLoading());

        console.log('12312312');


        Http.get(`api/admin/toolbar/selection/${selectionId}`)
            .then(menuData => {

                console.log(menuData);

                if (menuData.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error setTestExisting');
                    console.log(menuData);

                    return;
                }

                const tree = {
                    module: menuData.selectionTitle,
                    id: menuData.selectionId,
                    description: 'SELECTION',
                    children: menuData.selectionTests.map(test => {
                        return {
                            description: 'TEST',
                            collapsed: true,
                            module: test.testTitle,
                            id: test.testId,
                            children: test.testCategory.map(category => {
                                return {
                                    description: 'CATEGORY',
                                    module: category.categoryTitle,
                                    selectionId: menuData.selectionId,
                                    testId: test.testId,
                                    id: category.categoryId,
                                    children: null
                                };
                            })
                        };
                    })
                };

                console.log(tree);
                console.log('penis');


                dispatch(selectionSetMenuDataSuccess(tree));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                dispatch(selectionSetError(err));
            });
    };
}

export function getQuestionForMenuData(selectionId, testId, categoryId, menuData) {
    return (dispatch) => {
        dispatch(selectionLoading());

        Http.get(`api/admin/toolbar/category/${categoryId}/questions`)
            .then(questions => {

                console.log(questions);


                const indexTest = menuData.children.findIndex((test) => {
                    return test.id === testId;
                });

                const categoryIndex = menuData.children[indexTest].children.findIndex((category) => {
                    return category.id === categoryId;
                });


                menuData.children[indexTest].children[categoryIndex].children = questions.map(question => {
                    return {
                        description: 'QUESTION',
                        module: question.questionTitle,
                        id: question.questionId
                    };
                });

                console.log('menuData');


                dispatch(selectionSetMenuDataSuccess(menuData));
            })
            .then(() => dispatch(selectionStopLoading()))
            .catch((err) => {
                dispatch(selectionSetError(err));
            });
    };
}
