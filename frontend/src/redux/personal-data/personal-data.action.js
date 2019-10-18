import {
    SHOW_PERSONAL_DATA,
    HIDE_PERSONAL_DATA,
} from './personal-data.constant.js';

const showPersonalDataAction = () => ({
    type: SHOW_PERSONAL_DATA,
});

const hidePersonalDataAction = () => ({
    type: HIDE_PERSONAL_DATA
});

export function showPersonalData() {
    return (dispatch) => {
        dispatch(showPersonalDataAction());
    };
}

export function hidePersonalData() {
    return (dispatch) => {
        dispatch(hidePersonalDataAction());
    };
}
