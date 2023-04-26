import {
  Error,
  Request,
  dashboard,
  wordFailure,
  wordRequest,
  wordSuccess,
} from "./action.Type";

const initialState = {
  allUser: [],
  isLoading: false,
  isError: false,
  wordLoading: false,
  wordError: false,
  wordLength: 0,
  isWords: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Request:
      return { ...state, isLoading: true };
    case dashboard:
      return { ...state, isLoading: false, allUser: action.payload };
    case Error:
      return { ...state, isLoading: false, isError: true };
    case wordRequest:
      return { ...state, wordLoading: true };
    case wordFailure:
      return { ...state, wordError: true, wordLoading: false };
    case wordSuccess:
      return {
        ...state,
        wordLoading: false,
        wordLength: action.payload.length,
        isWords: action.payload.word,
      };
    default:
      return state;
  }
}
export default reducer;
