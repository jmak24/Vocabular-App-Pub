import { setToast } from "./toasts";
import { getAsyncStorage } from "../../utils/helper";
import {
  WORDS_DATA,
  WORDS_LIST,
  ARCHIVED_WORDS_LIST,
  RECENT_WORDS,
} from "../../models/dummy-data";

export const SETUP_INIT = "SETUP_INIT";
export const TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK";
export const TOGGLE_ARCHIVE = "TOGGLE_ARCHIVE";
export const ADD_RECENT_WORD = "ADD_RECENT_WORD";
export const REMOVE_RECENT_WORD = "REMOVE_RECENT_WORD";
export const CLEAR_RECENT_WORDS = "CLEAR_RECENT_WORDS";

export const setupInitWordsState = () => async (dispatch) => {
  try {
    // const words = await getAsyncStorage("words");
    // const wordsList = await getAsyncStorage("wordsList");
    // const archivedWords = await getAsyncStorage("archivedWords");
    // const recentWords = await getAsyncStorage("recentWords");
    // let archivedWordsList = [];
    // for (const year in archivedWords) {
    //   for (let i = 0; i < 12; i++) {
    //     archivedWordsList = archivedWordsList.concat(archivedWords[year][i]);
    //   }
    // }

    const words = WORDS_DATA;
    const wordsList = WORDS_LIST;
    const archivedWords = ARCHIVED_WORDS_LIST;
    const recentWords = RECENT_WORDS;
    let archivedWordsList = [];
    for (const year in archivedWords) {
      for (let i = 0; i < 12; i++) {
        archivedWordsList = archivedWordsList.concat(archivedWords[year][i]);
      }
    }

    dispatch({
      type: SETUP_INIT,
      payload: {
        words,
        wordsList,
        archivedWords,
        archivedWordsList,
        recentWords,
      },
    });
  } catch (err) {
    console.log(err);
    const toastMsg = "Failed to load the intial state";
    dispatch(setToast("toastDanger", toastMsg, "ios-warning"));
  }
};

export const toggleBookmark = (wordDetails, isBookmarked) => async (
  dispatch
) => {
  try {
    dispatch({
      type: TOGGLE_BOOKMARK,
      payload: { wordDetails, isBookmarked },
    });
  } catch (err) {
    console.log(err);
    const toastMsg = isBookmarked
      ? "An error occurred removing from Bookmark"
      : "An error occurred adding to Bookmark";
    dispatch(setToast("toastDanger", toastMsg, "ios-warning"));
  }
};

export const toggleArchive = (targetWord, isArchived) => async (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_ARCHIVE,
      payload: { targetWord },
    });
  } catch (err) {
    console.log(err);
    const toastMsg = isArchived
      ? "An error occurred removing from Archive"
      : "An error occurred adding to Archive";
    dispatch(setToast("toastDanger", toastMsg, "ios-warning"));
  }
};

export const addRecentWord = (wordSearched) => {
  return {
    type: ADD_RECENT_WORD,
    payload: { wordSearched },
  };
};

export const removeRecentWord = (indexToRemove) => {
  return {
    type: REMOVE_RECENT_WORD,
    payload: { indexToRemove },
  };
};

export const clearAllRecentWords = () => {
  return {
    type: CLEAR_RECENT_WORDS,
  };
};
