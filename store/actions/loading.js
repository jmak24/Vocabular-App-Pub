const createLoadingActionType = (suffix) => {
  return (actionName) => {
    return `${actionName}_${suffix}`;
  };
};

export const FETCH_WORD_DETAILS = "FETCH_WORD_DETAILS";
export const FETCH_PHRASES = "FETCH_PHRASES";
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";

const createFetchWordRequest = createLoadingActionType("REQUEST");
const createFetchWordSuccess = createLoadingActionType("SUCCESS");
const createFetchWordFail = createLoadingActionType("FAIL");
const createFetchPhrasesRequest = createLoadingActionType("REQUEST");
const createFetchPhrasesSuccess = createLoadingActionType("SUCCESS");
const createFetchPhrasesFail = createLoadingActionType("FAIL");
const createFetchUserRequest = createLoadingActionType("REQUEST");
const createFetchUserSuccess = createLoadingActionType("SUCCESS");
const createFetchUserFail = createLoadingActionType("FAIL");

const FETCH_WORD_DETAILS_REQUEST = createFetchWordRequest(FETCH_WORD_DETAILS);
const FETCH_WORD_DETAILS_SUCCESS = createFetchWordSuccess(FETCH_WORD_DETAILS);
const FETCH_WORD_DETAILS_FAIL = createFetchWordFail(FETCH_WORD_DETAILS);
const FETCH_PHRASES_REQUEST = createFetchPhrasesRequest(FETCH_PHRASES);
const FETCH_PHRASES_SUCCESS = createFetchPhrasesSuccess(FETCH_PHRASES);
const FETCH_PHRASES_FAIL = createFetchPhrasesFail(FETCH_PHRASES);
const FETCH_USER_PROFILE_REQUEST = createFetchUserRequest(FETCH_USER_PROFILE);
const FETCH_USER_PROFILE_SUCCESS = createFetchUserSuccess(FETCH_USER_PROFILE);
const FETCH_USER_PROFILE_FAIL = createFetchUserFail(FETCH_USER_PROFILE);

export const fetchWordDetails = (actionType) => (dispatch) => {
  switch (actionType.toUpperCase()) {
    case "REQUEST":
      return dispatch({ type: FETCH_WORD_DETAILS_REQUEST });
    case "SUCCESS":
      return dispatch({ type: FETCH_WORD_DETAILS_SUCCESS });
    case "FAIL":
      return dispatch({ type: FETCH_WORD_DETAILS_FAIL });
    default:
      return;
  }
};

export const fetchPhrases = (actionType) => (dispatch) => {
  switch (actionType.toUpperCase()) {
    case "REQUEST":
      return dispatch({ type: FETCH_PHRASES_REQUEST });
    case "SUCCESS":
      return dispatch({ type: FETCH_PHRASES_SUCCESS });
    case "FAIL":
      return dispatch({ type: FETCH_PHRASES_FAIL });
    default:
      return;
  }
};

export const fetchUserProfile = (actionType) => (dispatch) => {
  switch (actionType.toUpperCase()) {
    case "REQUEST":
      return dispatch({ type: FETCH_USER_PROFILE_REQUEST });
    case "SUCCESS":
      return dispatch({ type: FETCH_USER_PROFILE_SUCCESS });
    case "FAIL":
      return dispatch({ type: FETCH_USER_PROFILE_FAIL });
    default:
      return;
  }
};
