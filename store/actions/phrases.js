import { setToast } from "./toasts";
import { updatePhraseVisibility, phrasesToObj } from "../../utils/helper";
import { fetchPhrases } from "../actions/loading";

export const SET_PHRASE_DATA = "SET_PHRASE_DATA";
export const POST_PHRASE = "POST_PHRASE";
export const REMOVE_PHRASE = "REMOVE_PHRASE";
export const TOGGLE_PHRASE_LIKE = "TOGGLE_PHRASE_LIKE";
export const TOGGLE_PHRASE_VISIBILITY = "TOGGLE_PHRASE_VISIBILITY";
export const LOAD_RECENT_PHRASES = "LOAD_RECENT_PHRASES";
export const CLEANUP_PHRASES = "CLEANUP_PHRASES";

import {
  createPhrase,
  deletePhrase,
  updatePhraseLikes,
  getPhrasesByUser,
  getPhrasesByLikes,
  getPhrasesByDate,
} from "../../utils/helper";

export const setPhraseData = (phraseData) => {
  return {
    type: SET_PHRASE_DATA,
    payload: { phraseData },
  };
};

export const cleanupPhrases = () => {
  return {
    type: CLEANUP_PHRASES,
  };
};

export const handleLoadPhrases = ({ word }) => async (dispatch, getState) => {
  const { userProfile: authedUser } = getState();
  try {
    dispatch(fetchPhrases("REQUEST"));
    let myPhrasesArr, myPhrasesRes;
    if (authedUser) {
      myPhrasesRes = await getPhrasesByUser({
        userId: authedUser.id,
        word,
      });
      myPhrasesArr = myPhrasesRes.data.phrasesByUser.items;
    }
    const topPhrasesRes = await getPhrasesByLikes({ word });
    const topPhrasesArr = topPhrasesRes.data.phrasesByLikes.items;
    const recentPhrasesRes = await getPhrasesByDate({ word });
    const recentPhrasesArr = recentPhrasesRes.data.phrasesByDate.items;

    const phraseData = {
      myPhrases: authedUser ? phrasesToObj(myPhrasesArr) : {},
      topPhrases: phrasesToObj(topPhrasesArr),
      recentPhrases: phrasesToObj(recentPhrasesArr),
    };
    dispatch(setPhraseData(phraseData));
    dispatch(fetchPhrases("SUCCESS"));
  } catch (err) {
    dispatch(
      setToast("toastError", "Failed to Load Phrases", "ios-close-circle")
    );
    dispatch(fetchPhrases("FAIL"));
    console.log(err);
  }
};

export const handlePostPhrase = ({ word, textInput, isPublic }) => async (
  dispatch,
  getState
) => {
  const { userProfile: authedUser } = getState();
  const phrase = {
    word,
    phrase: textInput,
    numLikes: 0,
    likes: JSON.stringify([]),
    authorId: authedUser.id,
    isPublic,
    createdAt: new Date(),
    type: "Phrase",
  };
  try {
    const res = await createPhrase({ phrase });
    const newPhrase = res.data.createPhrase;
    newPhrase.likes = [];
    dispatch({
      type: POST_PHRASE,
      payload: { phrase: newPhrase },
    });
  } catch (err) {
    dispatch(
      setToast("toastError", "Failed to Post Phrase", "ios-close-circle")
    );
  }
  dispatch(setToast("toastInfo", "Phrase Posted!", "ios-checkmark-circle"));
};

export const handleRemovePhrase = ({ phraseId }) => async (dispatch) => {
  try {
    await deletePhrase({ phraseId });
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

export const handleTogglePhraseLike = ({
  phraseId,
  authedUserId,
  hasLiked,
  likes,
}) => async (dispatch) => {
  dispatch({
    type: TOGGLE_PHRASE_LIKE,
    payload: { phraseId, userId: authedUserId, hasLiked },
  });
  try {
    await updatePhraseLikes({
      phraseId,
      userId: authedUserId,
      likes,
    });
  } catch (err) {
    dispatch({
      type: TOGGLE_PHRASE_LIKE,
      payload: { phraseId, userId: authedUserId, hasLiked: !hasLiked },
    });
    const errorToastMsg = hasLiked
      ? "Failed to Unlike Phrase"
      : "Failed to Like Phrase";
    dispatch(setToast("toastError", errorToastMsg, "ios-close-circle"));
    console.log(err);
  }
};

export const handleTogglePhraseVisibility = ({ phraseId, isPublic }) => async (
  dispatch
) => {
  dispatch({
    type: TOGGLE_PHRASE_VISIBILITY,
    payload: { phraseId },
  });
  try {
    await updatePhraseVisibility({ phraseId, isPublic });
  } catch (err) {
    dispatch({
      type: TOGGLE_PHRASE_VISIBILITY,
      payload: { phraseId },
    });
    const errorToastMsg = isPublic
      ? "Failed to set Phrase Public"
      : "Failed to set Phrase Private";
    dispatch(setToast("toastError", errorToastMsg, "ios-close-circle"));
  }

  const toastMsg = isPublic
    ? "Phrase has been set to Public"
    : "Phrase has been set to Private";
  const toastIcon = isPublic ? "ios-eye" : "ios-eye-off";
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
        "toastError",
        "Error occurred loading more phrases",
        "ios-warning"
      )
    );
  }
};
