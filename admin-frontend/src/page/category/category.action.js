import Http from '../../service/http';
import {
    CATEGORY_CLEAR_QUESTION_LIST,
    CATEGORY_ERROR_SERVER,
    CATEGORY_LOADING,
    CATEGORY_REDIRECT_TO_TESTS,
    CATEGORY_STOP_LOADING,
    CATEGORY_SUCCESS,
    QUESTIONS_SUCCESS
} from './category.constant';
import handleError from '../../service/handleError';

export const categoryLoading = () => ({
    type: CATEGORY_LOADING,
});

export const categorySuccess = (category) => ({
    type: CATEGORY_SUCCESS,
    payload: category
});

export const questionsSuccess = (questions) => ({
    type: QUESTIONS_SUCCESS,
    payload: questions
});

export const categorySetError = (err) => ({
    type: CATEGORY_ERROR_SERVER,
    payload: err
});

export const stopLoading = () => ({
    type: CATEGORY_STOP_LOADING
});

export const categoryRedirectToTests = () => ({
    type: CATEGORY_REDIRECT_TO_TESTS
});

export const categoryClearQuestions = () => ({
    type: CATEGORY_CLEAR_QUESTION_LIST
});

export function getCategoryInfo(categoryId) {
    return (dispatch) => {
        dispatch(categoryLoading());

        Http.get(`api/admin/testing/category/${categoryId}`)
            .then(category => {

                console.log('getCategoryInfo');
                console.log(category);
                if (category.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getCategoryInfo', category);
                    dispatch(stopLoading());
                    handleError(category);
                    return;
                }

                dispatch(categorySuccess(category));
            })
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });

    };
}

export function getQuestionForCategory(categoryId) {
    return (dispatch) => {
        dispatch(categoryLoading());

        Http.get(`api/admin/testing/category/${categoryId}/questions`)
            .then(questions => {

                console.log('getQuestionForCategory');
                console.log(questions);

                if (questions.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error getQuestionForCategory', questions);
                    handleError(questions);
                    dispatch(stopLoading());
                    return;
                }

                dispatch(questionsSuccess(questions));
            })
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function saveCategory(categoryId, category) {
    return (dispatch) => {
        dispatch(categoryLoading());
        Http.post(`api/admin/testing/category/${categoryId}`, category)
            .then(category => {

                console.log('saveCategory');
                console.log(category);

                if (category.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error saveCategory', category);
                    handleError(category);
                    dispatch(stopLoading());
                    return;
                }

                dispatch(categorySuccess(category));
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function createNewCategory(testId, category) {
    return (dispatch) => {
        dispatch(categoryLoading());

        Http.post(`api/admin/testing/test/${testId}/categories`, category)
            .then(category => {

                console.log('createNewCategory');
                console.log(category);

                if (category.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     toast.error(category.selectionTitle[0]);
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     toast.error(category.selectionStartDate[0]);
                    // }
                    console.log('error createNewCategory', category);
                    handleError(category);
                    dispatch(stopLoading());
                    return;
                }


                dispatch(categorySuccess(category));
                dispatch(categoryClearQuestions());
                // dispatch(categoryRedirectToTests());
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}

export function deleteCategory(categoryId) {
    return (dispatch) => {
        dispatch(categoryLoading());

        Http.delete(`api/admin/testing/category/${categoryId}`)
            .then(res => {


                if (res.status === 'error') {
                    // if (res.hasOwnProperty('selectionTitle')) {
                    //     dispatch(setErrorSelection(res.selectionTitle[0]));
                    // }
                    //
                    // if (res.hasOwnProperty('selectionStartDate')) {
                    //     dispatch(setErrorSelection(res.selectionStartDate[0]));
                    // }
                    console.log('error deleteCategory', res);
                    handleError(res);
                    dispatch(stopLoading());
                    return;
                }

                console.log('createNewCategory');
                console.log(res);
                dispatch(categoryClearQuestions());
            })
            .then(() => dispatch(stopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(testSetError(err));
            });
    };
}
