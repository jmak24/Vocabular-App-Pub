import { setToast } from "./toasts";
import { updatePhraseVisibility, phrasesToObj } from "../../utils/helper";

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

// import { PHRASE_DATA } from "../../models/dummy-data"; // pull from AWS DB

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

export const togglePhraseLike = (phraseId, authedUserId, hasLiked) => {
  return {
    type: TOGGLE_PHRASE_LIKE,
    payload: { phraseId, authedUserId, hasLiked },
  };
};

export const togglePhraseVisibility = (phraseId, authedUser) => {
  return {
    type: TOGGLE_PHRASE_VISIBILITY,
    payload: { phraseId, authedUser },
  };
};

export const cleanupPhrases = () => {
  return {
    type: CLEANUP_PHRASES,
  };
};

// ****** TO REMOVE ******
// const authedUser = {
//   id: "bae8ad68-b36a-4adb-868d-7ffbbda1c18b",
//   userTag: "jmak",
// };
const authedUser = {
  id: "8aca195a-2932-4e78-94ae-0a74500d4a5a",
  userTag: "djdannyd",
};

export const handleLoadPhrases = ({ word }) => async (dispatch, getState) => {
  // const { authedUser } = getState()
  // dispatch(showLoading())
  try {
    const myPhrasesRes = await getPhrasesByUser({
      userId: authedUser.id,
      word,
    });
    const myPhrasesArr = myPhrasesRes.data.phrasesByUser.items;
    const topPhrasesRes = await getPhrasesByLikes({ word });
    const topPhrasesArr = topPhrasesRes.data.phrasesByLikes.items;
    const recentPhrasesRes = await getPhrasesByDate({ word });
    const recentPhrasesArr = recentPhrasesRes.data.phrasesByDate.items;

    const phraseData = {
      myPhrases: phrasesToObj(myPhrasesArr),
      topPhrases: phrasesToObj(topPhrasesArr),
      recentPhrases: phrasesToObj(recentPhrasesArr),
    };
    dispatch(setPhraseData(phraseData));
  } catch (err) {
    dispatch(
      setToast("toastError", "Failed to Load Phrases", "ios-close-circle")
    );
    console.log(err);
  }
};

export const handlePostPhrase = ({ word, textInput, isPublic }) => async (
  dispatch,
  getState
) => {
  // const { authedUser } = getState()
  const phrase = {
    word,
    phrase: textInput,
    numLikes: 0,
    likes: JSON.stringify([]),
    authorId: authedUser.id,
    authorTag: authedUser.userTag,
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

export const handleRemovePhrase = ({ phraseId }) => async (
  dispatch,
  getState
) => {
  // const { authedUser } = getState()
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
  authedUser,
  hasLiked,
  likes,
}) => async (dispatch, getState) => {
  // const { authedUser } = getState()
  try {
    await updatePhraseLikes({
      phraseId,
      userId: authedUser.id,
      likes,
    });
    dispatch({
      type: TOGGLE_PHRASE_LIKE,
      payload: { phraseId, userId: authedUser.id, hasLiked },
    });
  } catch (err) {
    const errorToastMsg = hasLiked
      ? "Failed to Unlike Phrase"
      : "Failed to Like Phrase";
    dispatch(setToast("toastError", errorToastMsg, "ios-close-circle"));
    console.log(err);
  }
};

export const handleTogglePhraseVisibility = ({ phraseId, isPublic }) => async (
  dispatch,
  getState
) => {
  // const { authedUser } = getState()
  try {
    // api call to DB to toggle phrase visibility (phraseId)
    await updatePhraseVisibility({ phraseId, isPublic });
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
