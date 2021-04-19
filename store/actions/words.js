import { setToast } from "./toasts";
import { getAsyncStorage } from "../../utils/helper";
// import {
//   WORDS_DATA,
//   WORDS_LIST,
//   ARCHIVED_WORDS_LIST,
//   RECENT_WORDS_LIST,
// } from "../../models/dummy-data";

export const SETUP_INIT = "SETUP_INIT";
export const TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK";
export const TOGGLE_ARCHIVE = "TOGGLE_ARCHIVE";
export const REMOVE_WORD = "REMOVE_WORD";
export const ADD_RECENT_WORD = "ADD_RECENT_WORD";
export const REMOVE_RECENT_WORD = "REMOVE_RECENT_WORD";
export const CLEAR_RECENT_WORDS = "CLEAR_RECENT_WORDS";
export const REMOVE_BOOKMARKED_WORDS = "REMOVE_BOOKMARKED_WORDS";
export const REMOVE_ARCHIVED_WORDS = "REMOVE_ARCHIVED_WORDS";

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

export const setupInitWordsState = () => async (dispatch) => {
  try {
    // const wordsData = WORDS_DATA;
    // const wordsBookmarked = WORDS_LIST;
    // const wordsArchived = ARCHIVED_WORDS_LIST;
    // const recentWords = RECENT_WORDS_LIST;
    // let wordsArchivedList = [];
    // for (const year in wordsArchived) {
    //   for (let i = 0; i < 12; i++) {
    //     wordsArchivedList = wordsArchivedList.concat(wordsArchived[year][i]);
    //   }
    // }
    const wordsData = (await getAsyncStorage("wordsData")) ?? {};
    const wordsBookmarked = (await getAsyncStorage("wordsBookmarked")) ?? [];
    const wordsArchived = (await getAsyncStorage("wordsArchived")) ?? {};
    const recentWords = (await getAsyncStorage("recentWords")) ?? [];
    let wordsArchivedList = [];

    const currentYear = new Date().getFullYear();
    if (!(currentYear in wordsArchived)) {
      wordsArchived[currentYear] = [];
      for (let i = 0; i < 12; i++) {
        wordsArchived[currentYear].push([]);
      }
    }
    for (const year in wordsArchived) {
      for (let i = 0; i < 12; i++) {
        wordsArchivedList = wordsArchivedList.concat(wordsArchived[year][i]);
      }
    }

    dispatch({
      type: SETUP_INIT,
      payload: {
        wordsData,
        wordsBookmarked,
        wordsArchived,
        wordsArchivedList,
        recentWords,
      },
    });
  } catch (err) {
    console.log(err);
    const toastMsg = "Failed to load the intial state";
    dispatch(setToast("toastError", toastMsg, "ios-warning"));
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
    dispatch(setToast("toastError", toastMsg, "ios-warning"));
  }
};

export const toggleArchive = (wordDetails, isArchived) => async (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_ARCHIVE,
      payload: { targetWord: wordDetails.word },
    });
  } catch (err) {
    console.log(err);
    const toastMsg = isArchived
      ? "An error occurred removing from Archive"
      : "An error occurred adding to Archive";
    dispatch(setToast("toastError", toastMsg, "ios-warning"));
  }
};

export const removeWord = (wordDetails) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_WORD,
      payload: { targetWord: wordDetails.word },
    });
  } catch (err) {
    console.log(err);
    dispatch(
      setToast(
        "toastError",
        "An error occurred removing the word",
        "ios-warning"
      )
    );
  }
};

export const clearBookmarkedWords = () => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_BOOKMARKED_WORDS,
    });
    dispatch(
      setToast("toastInfo", "Bookmarks cleared", "ios-checkmark-circle")
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setToast(
        "toastError",
        "Something went wrong performing this action",
        "ios-warning"
      )
    );
  }
};

export const clearArchivedWords = () => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ARCHIVED_WORDS,
    });
    dispatch(setToast("toastInfo", "Archive cleared", "ios-checkmark-circle"));
  } catch (err) {
    console.log(err);
    dispatch(
      setToast(
        "toastError",
        "Something went wrong performing this action",
        "ios-warning"
      )
    );
  }
};
