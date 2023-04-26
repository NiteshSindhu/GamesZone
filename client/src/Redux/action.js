import {
  Error,
  Request,
  dashboard,
  wordFailure,
  wordRequest,
  wordSuccess,
} from "./action.Type";

export const handleRequest = () => {
  return { type: Request };
};
export const handleDashboard = (payload) => {
  return { type: dashboard, payload };
};
export const handleError = () => {
  return { type: Error };
};

export const handleWordRequest = () => {
  return { type: wordRequest };
};
export const handleWordError = () => {
  return { type: wordFailure };
};
export const handleWordSuccessful = (payload) => {
  return { type: wordSuccess, payload };
};
