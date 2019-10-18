import Http from '../../service/http';
import {
    CATEGORY_SUCCESS,
    TEST_CLEAR_LIST_CATEGORIES,
    TEST_ERROR_SERVER,
    TEST_LOADING,
    TEST_STOP_LOADING,
    TEST_SUCCESS
} from './test.constant';
import handleError from '../../service/handleError';

export const testLoading = () => ({
    type: TEST_LOADING,
});

export const testSuccess = (test) => ({
    type: TEST_SUCCESS,
    payload: test
});

export const categoriesSuccess = (category) => ({
    type: CATEGORY_SUCCESS,
    payload: category
});

export const testSetError = (err) => ({
    type: TEST_ERROR_SERVER,
    payload: err
});

export const testStopLoading = () => ({
    type: TEST_STOP_LOADING,
});

export const testClearCategoryList = () => ({
    type: TEST_CLEAR_LIST_CATEGORIES,
});

export function getTestInfo(testId) {
    return (dispatch) => {
        dispatch(testLoading());

        Http.get(`api/admin/testing/test/${testId}`)
            .then(test => {

                if (test.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getTestInfo');
                    console.log(test);

                    handleError(test);
                    dispatch(testStopLoading());

                    return;
                }

                console.log('getTestInfo');
                console.log(test);

                dispatch(testSuccess(test));
            })
            .then(() => dispatch(testStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function getCategoriesForTest(testId) {
    return (dispatch) => {
        dispatch(testLoading());

        Http.get(`api/admin/testing/test/${testId}/categories`)
            .then(categories => {


                if (categories.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getCategoriesForTest');
                    console.log(categories);

                    handleError(categories);
                    dispatch(testStopLoading());

                    return;
                }


                console.log('getCategoriesForTest');
                console.log(categories);

                dispatch(categoriesSuccess(categories));
            })
            .then(() => dispatch(testStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function changeTest(testId, test) {
    return (dispatch) => {
        dispatch(testLoading());

        Http.post(`api/admin/testing/test/${testId}`, test)
            .then(test => {


                if (test.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error changeTest');
                    console.log(test);

                    handleError(test);
                    dispatch(testStopLoading());

                    return;
                }

                console.log('changeTest');
                console.log(test);

                dispatch(testSuccess(test));
            })
            .then(() => dispatch(testStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function createNewTest(selectionId, test) {
    return (dispatch) => {
        dispatch(testLoading());
        Http.post(`api/admin/testing/selection/${selectionId}/tests`, test)
            .then(test => {

                if (test.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error createNewTest');
                    console.log(test);

                    handleError(test);
                    dispatch(testStopLoading());

                    return;
                }

                console.log('createNewTest');
                console.log(test);

                dispatch(testSuccess(test));
                dispatch(testClearCategoryList());
            })
            .then(() => dispatch(testStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function deleteTest(testId) {
    return (dispatch) => {
        dispatch(testLoading());
        Http.delete(`api/admin/testing/test/${testId}`)
            .then(test => {

                console.log('deleteTest');
                console.log(test);

                if (test.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error deleteTest');
                    console.log(test);

                    handleError(test);
                    dispatch(testStopLoading());

                    return;
                }

                dispatch(testClearCategoryList());
            })
            .then(() => dispatch(testStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function createOneTest(test) {
    return (dispatch) => {
        dispatch(testLoading());
        Http.post('api/admin/testing/tests', test)
            .then(test => {

                console.log('createNewTest');
                console.log(test);


                if (test.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error deleteTest');
                    console.log(test);

                    handleError(test);
                    dispatch(testStopLoading());

                    return;
                }


                dispatch(testSuccess(test));
                dispatch(testClearCategoryList());
            })
            .then(() => dispatch(testStopLoading()))
            .catch((err) => {
                console.log(err);
            });
    };
}
