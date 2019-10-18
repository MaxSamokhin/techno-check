import { QUESTION_BY_QUESTION_SUCCESS, QUESTION_BY_USER_SUCCESS, QUESTION_LOADING, QUESTION_STOP_LOADING } from "./question.constant";

const initialState = {
  isLoadingQuestion: false,
  questionByUser: null,
  questionByQuestion: null
};

export default function questions(state = initialState, action) {
  switch (action.type) {
    case QUESTION_LOADING:
      return {
        ...state,
        isLoadingQuestion: true
      };
    case QUESTION_BY_USER_SUCCESS: {
      return {
        ...state,
        questionByUser: action.payload,
        questionByQuestion: null,
        isLoadingQuestion: false
      };
    }
    case QUESTION_BY_QUESTION_SUCCESS: {
      return {
        ...state,
        questionByQuestion: action.payload,
        questionByUser: null,
        isLoadingQuestion: false
      };
    }
    case QUESTION_STOP_LOADING: {
      return {
        ...state,
        isLoadingQuestion: false
      };
    }
    default:
      return state;
  }
}
