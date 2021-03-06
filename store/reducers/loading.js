import {
  FETCH_WORD_DETAILS,
  FETCH_PHRASES,
  FETCH_USER_PROFILE,
  FETCH_SUGGESTED_WORDS,
} from "../actions/loading";

const getActionName = (actionType) => {
  if (typeof actionType !== "string") {
    return null;
  }

  return actionType.split("_").slice(0, -1).join("_");
};

const initialState = {
  [FETCH_WORD_DETAILS]: { loading: false },
  [FETCH_PHRASES]: { loading: false },
  [FETCH_USER_PROFILE]: { loading: false },
  [FETCH_SUGGESTED_WORDS]: { loading: false },
};

export default (state = initialState, action) => {
  const { type } = action;
  const actionName = getActionName(type);
  if (type.endsWith("_REQUEST")) {
    return {
      ...state,
      [actionName]: {
        loading: true,
      },
    };
  } else if (type.endsWith("_SUCCESS") || type.endsWith("_FAIL")) {
    return {
      ...state,
      [actionName]: {
        loading: false,
      },
    };
  } else {
    return state;
  }
};
