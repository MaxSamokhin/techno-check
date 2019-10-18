import {IS_SELECTION_HOME_PAGE, IS_TEST_HOME_PAGE} from './route.constant';

const initialState = {
    fromTestHomePage: false,
    fromSelectionHomePage: true
};

export default function routeNavigation(state = initialState, action) {
    switch (action.type) {
        case IS_TEST_HOME_PAGE: {
            return {
                ...state,
                fromTestHomePage: true,
                fromSelectionHomePage: false
            };
        }
        case IS_SELECTION_HOME_PAGE:
            return {
                ...state,
                fromTestHomePage: false,
                fromSelectionHomePage: true
            };
        default:
            return state;
    }
}
