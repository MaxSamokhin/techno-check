import {
    GROUP_BY_QUESTION,
    GROUP_BY_USER,
} from './grouping.constant.js';

const groupByQuestion = () => ({
    type: GROUP_BY_QUESTION,
});

const groupByUser = () => ({
    type: GROUP_BY_USER
});

export function setGroupByQuestion() {
    return (dispatch) => {
        dispatch(groupByQuestion());
    };
}

export function setGroupByUser() {
    return (dispatch) => {
        dispatch(groupByUser());
    };
}
