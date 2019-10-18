import {
    // USER_REQUEST,
    USER_SUCCESS,
    USER_FAILURE, USER_INFO_SUCCESS
} from '../actions/actions-types';


const initialState = {
    isLoadingUser: false,
    isAuth: false,
    userData: null,
    dateEnd: null,
    dateStart: null,
    userSelectionId: null,
    selectionTitile: null,
    userTests: []
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_SUCCESS:
            return {
                ...state,
                isLoadingUser: true,
                isAuth: true,
            };
        case USER_FAILURE:
            return {
                ...state,
            };
        case USER_INFO_SUCCESS: {
            const {user, userSelection} = action.payload;

            console.log(USER_INFO_SUCCESS, userSelection,user, user.email);

            return {
                ...state,
                userData: user.email,
                dateEnd: userSelection.dateEnd,
                dateStart: userSelection.dateStart,
                userSelectionId: userSelection.userSelectionId,
                userTests: userSelection.userTests,
                selectionTitle: userSelection.selectionTitle
            };
        }
        default:
            return state;
    }
}
