import {
    INQUIRER_REQUEST,
    INQUIRER_SUCCESS,
    INQUIRER_ERROR_SERVER,
    INQUIRER_ADD,
    TEST_ADD_SUCCESS,
    INQUIRER_DELETE_TEST,
    INQUIRER_DELETE_CATEGORY,
    INQUIRER_DELETE_INQUIRER,
    INQUIRER_DELETE_QUESTION,
    INQUIRER_NOT_ALL_DATA,
    CATEGORY_ADD_SUCCESS,
    INQUIRER_SAVE_INQUIRER_SUCCESS,
    INQUIRER_SAVE_TEST_SUCCESS,
    INQUIRER_NOT_ALL_VALID_DATA_TEST,
    INQUIRER_SAVE_CATEGORY_SUCCESS,
    INQUIRER_NOT_VALID_DATA_CATEGORY,
    INQUIRER_NOT_FOUND_USER_FILE,
    INQUIRER_DOWNLOAD_USER_DATA_SUCCESS,
    INQUIRER_IS_NOT_VALID_TIME
} from './actions-types';

import moment from 'moment';
import Http from '../service/http';
import checkResponse from '../service/check-response';
import {isString} from '../service/is-string';
import {isValidTest, isValidCategory, isValidStartAndEndDate} from '../service/validator';

const inquirerRequest = () => ({
    type: INQUIRER_REQUEST,
});

export const inquirerSuccess = (data) => ({
    type: INQUIRER_SUCCESS,
    payload: data
});

const inquirerServerError = (msg) => ({
    type: INQUIRER_ERROR_SERVER,
    payload: msg
});

const inquirerAdd = (data) => ({
    type: INQUIRER_ADD,
    payload: data
});

const inquirerDeleteInquirer = inquirerId => ({
    type: INQUIRER_DELETE_INQUIRER,
    payload: inquirerId
});

const inquirerDeleteTest = ({inquirerId, testId}) => ({
    type: INQUIRER_DELETE_TEST,
    payload: {inquirerId, testId}
});

const addTestSuccess = (data, inquirerId) => ({
    type: TEST_ADD_SUCCESS,
    payload: {
        data,
        inquirerId
    }
});

const inquirerDeleteQuestion = ({inquirerId, testId, categoryId, questionId}) => ({
    type: INQUIRER_DELETE_QUESTION,
    payload: {
        inquirerId,
        categoryId,
        testId,
        questionId
    }
});

const inquirerDeleteCategory = ({inquirerId, categoryId, testId}) => ({
    type: INQUIRER_DELETE_CATEGORY,
    payload: {
        inquirerId,
        categoryId,
        testId
    }
});

const inquirerValidData = () => ({
    type: INQUIRER_NOT_ALL_DATA,
    payload: {
        msg: 'Заполнены не все данные опросника'
    }
});

const inquirerSaveInquirerSuccess = () => ({
    type: INQUIRER_SAVE_INQUIRER_SUCCESS,
    payload: {
        msg: 'Данные опросника успешно сохранены',
    }
});

const inquirerSaveTestSuccess = () => ({
    type: INQUIRER_SAVE_TEST_SUCCESS,
    payload: {
        msg: 'Данные теста успешно сохранены',
    }
});

const inquirerNotAllValidData = () => ({
    type: INQUIRER_NOT_ALL_VALID_DATA_TEST,
    payload: {
        msg: 'Проверьте данные теста'
    }
});

const inquirerSaveCategorySuccess = () => ({
    type: INQUIRER_SAVE_CATEGORY_SUCCESS,
    payload: {
        msg: 'Данные категории успешно сохранены'
    }
});

const inquirerNotValidDateCategory = () => ({
    type: INQUIRER_NOT_VALID_DATA_CATEGORY,
    payload: {
        msg: 'Введите валидные данные для категории'
    }
});

const addCategorySuccess = (data, inquirerId, testId) => ({
    type: CATEGORY_ADD_SUCCESS,
    payload: {
        data,
        inquirerId,
        testId
    }
});

const inquirerNotFoundUserFile = () => ({
    type: INQUIRER_NOT_FOUND_USER_FILE,
    payload: {
        msg: 'Файл с пользовательскими данными не загружен'
    }
});

const inquirerDownloadUserDataSuccess = () => ({
    type: INQUIRER_DOWNLOAD_USER_DATA_SUCCESS,
    payload: {
        msg: 'Приглашения успешно отправлены'
    }
});

const inquirerIsNotValidTime = () => ({
    type: INQUIRER_IS_NOT_VALID_TIME,
    payload: {
        msg: 'Невалидное время опросника'
    }
});

export function addTest(data, inquirerId) { //TODO
    return dispatch => {
        dispatch(addTestSuccess(data, inquirerId));
    };
}

export function addInquirer(data) { //TODO
    return dispatch => {
        console.log('addInquirer', data);
        dispatch(inquirerAdd(data));
    };
}

export function saveInquirer(inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate) { // TODO
    return dispatch => {
        dispatch(inquirerRequest());

        if (!inquirerTitle || !inquirerStartDate || !inquirerEndDate) {
            dispatch(inquirerValidData());
            return;
        }

        console.log('saveInquirer', inquirerStartDate, inquirerEndDate);
        if (!isValidStartAndEndDate(inquirerStartDate, inquirerEndDate)) {
            dispatch(inquirerIsNotValidTime());
            return;
        }

        Http.post('api/admin/testing/inquirer', {
            inquirerTitle,
            // inquirerStartDate: moment(inquirerStartDate).format('YYYY-MM-DDThh:mm'),
            // inquirerEndDate: moment(inquirerEndDate).format('YYYY-MM-DDThh:mm')
            inquirerStartDate: moment(inquirerStartDate).format('YYYY-MM-DDT') + '00:01',
            inquirerEndDate: moment(inquirerEndDate).format('YYYY-MM-DDT') + '23:59'
        })
            .then(() => {
                Http.get('api/admin/testing/inquirer')
                    .then(res => {
                        console.log('getInquirer', res);
                        dispatch(inquirerSuccess(res));
                        dispatch(inquirerSaveInquirerSuccess());
                    });
            });

        console.log(inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate); // ели успех - getInquirer
    };
}

export function changeInquirer(inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate) { // TODO
    return dispatch => {
        dispatch(inquirerRequest());
        if (!inquirerTitle || !inquirerStartDate || !inquirerEndDate) {
            dispatch(inquirerValidData());
            return;
        }

        console.log('changeInquirer', inquirerStartDate, inquirerEndDate);
        if (!isValidStartAndEndDate(inquirerStartDate, inquirerEndDate)) {
            dispatch(inquirerIsNotValidTime());
            return;
        }

        Http.post(`api/admin/testing/inquirer/${inquirerId}`, {
            inquirerTitle,
            inquirerStartDate: inquirerStartDate,
            inquirerEndDate: inquirerEndDate
        })
            .then(() => dispatch(inquirerSaveInquirerSuccess()), 
            (err) => dispatch(inquirerServerError(err)));

        console.log(inquirerId, inquirerTitle, inquirerStartDate, inquirerEndDate); // если успех - getInquirer
    };
}

export function changeTest(inquirerId, testId, testTitle, testLimit) {
    return dispatch => {
        dispatch(inquirerRequest());

        if (!isValidTest(testTitle, testLimit)) {
            dispatch(inquirerNotAllValidData());
            return;
        }

        Http.post(`api/admin/testing/test/${testId}`, {
            testTitle,
            timeLimit: testLimit
        })
            .then(() => dispatch(inquirerSaveTestSuccess()));
        console.log(inquirerId, testId, testTitle, testLimit);
    };
}

export function saveTest(inquirerId, testId, testTitle, testLimit) {
    return dispatch => {
        dispatch(inquirerRequest());

        if (!isValidTest(testTitle, testLimit)) {
            dispatch(inquirerNotAllValidData());
            return;
        }

        Http.post(`api/admin/testing/inquirer/${inquirerId}/tests`, {
            testTitle,
            timeLimit: testLimit
        })
            .then(() => {
                Http.get('api/admin/testing/inquirer')
                    .then((res) => {
                        dispatch(inquirerSuccess(res));
                        dispatch(inquirerSaveTestSuccess());
                    });
            });

        console.log('saveTest', inquirerId, testId, testTitle, testLimit); // ели успех - getInquirer
    };
}

export function deleteInquirer(inquirerId) {
    return dispatch => {
        dispatch(inquirerRequest());

        if (isString(inquirerId) && inquirerId.substr(0, 1) === '_') {
            dispatch(inquirerDeleteInquirer(inquirerId));
            return;
        }

        Http.delete(`api/admin/testing/inquirer/${inquirerId}`)
            .then(() => {
                Http.get('api/admin/testing/inquirer')
                    .then(res => {
                        console.log('getInquirer', res);
                        dispatch(inquirerSuccess(res));
                    });
            });
    };
}

export function changeCategory(inquirerId, testId, categoryId, categoryTitle) {
    return dispatch => {
        dispatch(inquirerRequest());
        Http.post(`api/admin/testing/category/${categoryId}`, {
            categoryTitle
        })
            .then(res => {
                if (res.categoryTitle[0] === 'This field may not be blank.') {  // TODO: this is shit.
                    dispatch(inquirerNotValidDateCategory());
                } else {
                    dispatch(inquirerSaveCategorySuccess());
                }
            });
        console.log(inquirerId, testId, categoryId, categoryTitle);
    };
}

export function saveCategory(inquirerId, testId, categoryId, categoryTitle) {
    return dispatch => {
        dispatch(inquirerRequest());

        if (!isValidCategory(categoryTitle)) {
            dispatch(inquirerNotValidDateCategory());
            return;
        }

        Http.post(`api/admin/testing/test/${testId}/categories`, {
            categoryTitle
        })
            .then(() => {
                Http.get('api/admin/testing/inquirer')
                    .then(res => {
                        console.log('getInquirer', res);
                        dispatch(inquirerSuccess(res));
                        dispatch(inquirerSaveCategorySuccess());
                    });
            });
        console.log(inquirerId, testId, categoryId, categoryTitle);
    };
}

export function addCategory(data, inquirerId, testId) { //TODO
    console.log('addCategory', data, inquirerId, testId);
    return dispatch => {
        dispatch(addCategorySuccess(data, inquirerId, testId));
    };
}

export function deleteTest(inquirerId, testId) {
    return dispatch => {
        dispatch(inquirerRequest());

        if (isString(testId) && testId.substr(0, 1) === '_') {
            dispatch(inquirerDeleteTest({inquirerId, testId}));
            return;
        }

        Http.delete(`api/admin/testing/test/${testId}`)
            .then(res => {
                if (checkResponse(res)) {
                    dispatch(inquirerDeleteTest({inquirerId, testId}));
                }
            });
    };
}

export function deleteCategory(inquirerId, categoryId, testId) {
    return dispatch => {
        dispatch(inquirerRequest());

        if (isString(categoryId) && categoryId.substr(0, 1) === '_') {
            dispatch(inquirerDeleteCategory({inquirerId, categoryId, testId}));
            return;
        }

        Http.delete(`api/admin/testing/category/${categoryId}`)
            .then(res => {
                if (checkResponse(res)) {
                    dispatch(inquirerDeleteCategory({inquirerId, categoryId, testId}));
                }
            });
    };
}

export function deleteQuestion(inquirerId, categoryId, testId, questionId) {
    return dispatch => {
        dispatch(inquirerRequest());
        Http.delete(`api/admin/testing/question/${questionId}`)
            .then(() => dispatch(inquirerDeleteQuestion({inquirerId, testId, categoryId, questionId})));
        console.log(questionId);
    };
}

export function getInquirer() {
    return (dispatch) => {
        dispatch(inquirerRequest());
        Http.get('api/admin/testing/inquirer')
            .then(res => {
                console.log('getInquirer', res);
                dispatch(inquirerSuccess(res));
            })
            .catch((err) => {
                dispatch(inquirerServerError(err));
            });
    };
}

export function downloadUserFile(inquirerId, file) {
    console.log('downloadUserFile', inquirerId, file);
    return dispatch => {
        if (!file) {
            dispatch(inquirerNotFoundUserFile());
            return;
        }

        file.type = 'text/csv';
        console.log('downloadUserFilefile', file);

        let formData = new FormData();
        formData.append('file', file);

        fetch(`/api/admin/testing/selection/${inquirerId}/users`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData

        }).then(() => dispatch(inquirerDownloadUserDataSuccess()));
    };
}
