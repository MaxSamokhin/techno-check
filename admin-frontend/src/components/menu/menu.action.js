import {
    MENU_CLEAR_MENU_DATA,
    MENU_ERROR_SERVER,
    MENU_LOADING,
    MENU_SET_MENU_DATA_SUCCESS,
    MENU_STOP_LOADING
} from './menu.constant';

import Http from '../../service/http';

const menuLoading = () => ({
    type: MENU_LOADING,
});

const menuSetError = (err) => ({
    type: MENU_ERROR_SERVER,
    payload: err
});

const menuStopLoading = () => ({
    type: MENU_STOP_LOADING
});

const menuSetMenuDataSuccess = (menuData) => ({
    type: MENU_SET_MENU_DATA_SUCCESS,
    payload: menuData
});

const menuClearData = () => ({
    type: MENU_CLEAR_MENU_DATA
});

export function clearMenuData() {
    return (dispatch) => {
        dispatch(menuClearData());
    };
}

export function getMenuData(selectionId) {
    return (dispatch) => {
        dispatch(menuLoading());

        console.log('12312312', selectionId);


        Http.get(`api/admin/toolbar/selection/${selectionId}`)
            .then(menuData => {

                console.log(menuData);

                const tree = {
                    module: menuData.selectionTitle,
                    id: menuData.selectionId,
                    collapsed: false,
                    description: 'SELECTION',
                    children: menuData.selectionTests.map(test => {
                        return {
                            description: 'TEST',
                            collapsed: false,
                            module: test.testTitle,
                            id: test.testId,
                            children: test.testCategory.map(category => {
                                return {
                                    description: 'CATEGORY',
                                    module: category.categoryTitle,
                                    collapsed: false,
                                    selectionId: menuData.selectionId,
                                    testId: test.testId,
                                    id: category.categoryId,
                                    children: category.categoryQuestions.map(question => {
                                        return {
                                            description: 'QUESTION',
                                            module: question.questionTitle,
                                            id: question.questionId
                                        };
                                    })
                                };
                            })
                        };
                    })
                };

                console.log(tree);
                console.log('penis');


                dispatch(menuSetMenuDataSuccess(tree));
            })
            .then(() => dispatch(menuStopLoading()))
            .catch((err) => {
                console.log(err);
                // dispatch(menuSetError(err));
            });
    };
}

export function getMenuDataTest(testId) {
    return (dispatch) => {

        console.log('getMenuDataTest');

        Http.get(`api/admin/toolbar/test/${testId}`)
            .then(menuData => {

                console.log(menuData);

                const tree = {
                    description: 'TEST',
                    collapsed: false,
                    module: menuData.testTitle,
                    id: menuData.testId,
                    children: menuData.testCategory.map(category => {
                        return {
                            description: 'CATEGORY',
                            module: category.categoryTitle,
                            collapsed: false,
                            selectionId: menuData.selectionId,
                            testId: menuData.testId,
                            id: category.categoryId,
                            children: category.categoryQuestions.map(question => {
                                return {
                                    description: 'QUESTION',
                                    module: question.questionTitle,
                                    id: question.questionId
                                };
                            })
                        };
                    })
                };

                console.log(tree);

                dispatch(menuSetMenuDataSuccess(tree));
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getQuestionForMenuData(selectionId, testId, categoryId, menuData) {
    return (dispatch) => {
        dispatch(menuLoading());
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

                const newTree = Object.assign({}, menuData);

                console.log('menuData getQuestionForMenuData');
                console.log(newTree);

                dispatch(menuSetMenuDataSuccess(newTree));
            })
            .then(() => dispatch(menuStopLoading()))
            .catch((err) => {
                dispatch(menuSetError(err));
            });
    };
}
