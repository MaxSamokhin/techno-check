import {
    SHOW_PERSONAL_DATA,
    HIDE_PERSONAL_DATA,
} from './personal-data.constant.js';


const initialState = {
    isShowPersonalData: false,
};

export default function personalData(state = initialState, action) {
    switch (action.type) {
        case SHOW_PERSONAL_DATA:
            return {
                ...state,
                isShowPersonalData: true,
            };
        case HIDE_PERSONAL_DATA: {
            return {
                ...state,
                isShowPersonalData: false,
            };
        }
        default:
            return state;
    }
}
