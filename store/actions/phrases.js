import { setToast } from "./toasts";
import { generateUUID } from "../../utils/helper";

export const SET_PHRASE_DATA = "SET_PHRASE_DATA";
export const POST_PHRASE = "POST_PHRASE";
export const REMOVE_PHRASE = "REMOVE_PHRASE";
export const TOGGLE_PHRASE_LIKE = "TOGGLE_PHRASE_LIKE";
export const TOGGLE_PHRASE_VISIBILITY = "TOGGLE_PHRASE_VISIBILITY";
export const LOAD_RECENT_PHRASES = "LOAD_RECENT_PHRASES";

export const setPhraseData = (phraseData) => {
  return {
    type: SET_PHRASE_DATA,
    payload: { phraseData },
  };
};

export const postPhrase = (phrase) => {
  return {
    type: POST_PHRASE,
    payload: { phrase },
  };
};

export const removePhrase = (phraseId) => {
  return {
    type: REMOVE_PHRASE,
    payload: { phraseId },
  };
};

export const togglePhraseLike = (phraseId, authedUser, hasLiked) => {
  return {
    type: TOGGLE_PHRASE_LIKE,
    payload: { phraseId, authedUser, hasLiked },
  };
};

export const togglePhraseVisibility = (phraseId, authedUser) => {
  return {
    type: TOGGLE_PHRASE_VISIBILITY,
    payload: { phraseId, authedUser },
  };
};

export const handleLoadPhrases = () => async (dispatch, getState) => {
  // const { authedUser } = getState()
  const authedUser = "jmak";
  // dispatch(showLoading())
  try {
    dispatch({
      type: SET_PHRASE_DATA,
      payload: { authedUser },
    });
  } catch (err) {
    dispatch(
      setToast("toastError", "Failed to load Phrases", "ios-close-circle")
    );
  }
};

export const handlePostPhrase = ({ text, isPublic }) => async (
  dispatch,
  getState
) => {
  // const { authedUser } = getState()
  const authedUser = "jmak";
  // dispatch(showLoading())
  const phrase = {
    id: await generateUUID(),
    phrase: text,
    likes: [],
    author: authedUser,
    timestamp: new Date(),
    isPublic,
  };
  try {
    // ADD api call to DB to savePhrase(phraseId, phrase, author)
    dispatch({
      type: POST_PHRASE,
      payload: { phrase },
    });
  } catch (err) {
    dispatch(
      setToast("toastError", "Failed to Post Phrase", "ios-close-circle")
    );
  }
  dispatch(setToast("toastInfo", "Phrase Posted!", "ios-checkmark-circle"));
};

export const handleRemovePhrase = ({ phraseId }) => (dispatch, getState) => {
  // const { authedUser } = getState()
  // dispatch(showLoading())
  try {
    // ADD api call to DB to deletePhrase(phraseId)
    dispatch({
      type: REMOVE_PHRASE,
      payload: { phraseId },
    });
  } catch (err) {
    dispatch(
      setToast("toastError", "Failed to Remove Phrase", "ios-close-circle")
    );
  }
  dispatch(setToast("toastInfo", "Phrase Deleted", "ios-checkmark-circle"));
};

export const handleTogglePhraseLike = ({ phraseId, authedUser, hasLiked }) => (
  dispatch,
  getState
) => {
  // const { authedUser } = getState()
  // dispatch(showLoading())
  try {
    // api call to DB to deletePhrase(phraseId)
  } catch (err) {
    const errorToastMsg = hasLiked
      ? "Failed to Unlike Phrase"
      : "Failed to Like Phrase";
    dispatch(setToast("toastError", errorToastMsg, "ios-close-circle"));
  }
  dispatch({
    type: TOGGLE_PHRASE_LIKE,
    payload: { phraseId, authedUser, hasLiked },
  });
};

export const handleTogglePhraseVisibility = ({ phraseId, isPublic }) => (
  dispatch,
  getState
) => {
  // const { authedUser } = getState()
  // dispatch(showLoading())
  try {
    // api call to DB to toggle phrase visibility (phraseId)
    dispatch({
      type: TOGGLE_PHRASE_VISIBILITY,
      payload: { phraseId },
    });
  } catch (err) {
    const errorToastMsg = isPublic
      ? "Failed to set Phrase Private"
      : "Failed to set Phrase Public";
    dispatch(setToast("toastError", errorToastMsg, "ios-close-circle"));
  }
  const toastMsg = isPublic
    ? "Phrase has been set to Private"
    : "Phrase has been set to Public";
  const toastIcon = isPublic ? "ios-eye-off" : "ios-eye";
  dispatch(setToast("toastInfo", toastMsg, toastIcon));
};

export const getMoreRecentPhrases = (word) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_RECENT_PHRASES,
      payload: { word },
    });
  } catch (err) {
    console.log(err);
    dispatch(
      setToast(
        "toastDanger",
        "Error occurred loading more phrases",
        "ios-warning"
      )
    );
  }
};
