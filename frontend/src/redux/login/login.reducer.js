import { LOG_IN_USER_SUCCESS, LOG_OUT } from "./login.constant.js";
import { LOG_IN_SET_NO_ACCESS } from "./login.constant";

const initialState = {
  email: null,
  isSuperuser: false,
  isExpert: false,
  loginErrorMsg: null
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_USER_SUCCESS: {
      const { email, isSuperuser, isExpert } = action.payload;

      console.log(LOG_IN_USER_SUCCESS);
      console.log(email, isSuperuser);

      return {
        ...state,
        isExpert: isExpert,
        email: email,
        isSuperuser: isSuperuser
      };
    }
    case LOG_OUT:
      return {
        ...state,
        loginErrorMsg: null,
        isExpert: false,
        email: null,
        isSuperuser: false
      };
    case LOG_IN_SET_NO_ACCESS: {
      return {
        ...state,
        isSuperuser: false
      };
    }
    default:
      return state;
  }
}
