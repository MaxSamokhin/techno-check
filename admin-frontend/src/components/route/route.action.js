import {
    IS_SELECTION_HOME_PAGE,
    IS_TEST_HOME_PAGE,
} from './route.constant.js';


const fromSelectionPageAction = () => ({
    type: IS_SELECTION_HOME_PAGE
});

const fromTestPageAction = () => ({
    type: IS_TEST_HOME_PAGE
});

export function fromSelectionPage() {
    return (dispatch) => {
        dispatch(fromSelectionPageAction());
    };
}

export function fromTestPage() {
    return (dispatch) => {
        dispatch(fromTestPageAction());
    };
}
