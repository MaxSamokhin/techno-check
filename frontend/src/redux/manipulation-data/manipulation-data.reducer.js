import {
    SAVE_DATA,
    EXPORT_DATA,
    RESET
} from './manipulation-data.constant';

const initialState = {
    saveData: false,
    exportData: false,
};

export default function manipulation(state = initialState, action) {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                saveData: true,
            };
        case EXPORT_DATA: {
            return {
                ...state,
                exportData: true,
            };
        }
        case RESET: {
            return {
                ...state,
                saveData: false,
                exportData: false,
            }
        }
        default:
            return state;
    }
}
