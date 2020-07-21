export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK";
export const TOGGLE_ARCHIVE = "TOGGLE_ARCHIVE";
export const ADD_RECENT_WORD = "ADD_RECENT_WORD";
export const REMOVE_RECENT_WORD = "REMOVE_RECENT_WORD";
export const CLEAR_RECENT_WORDS = "CLEAR_RECENT_WORDS";

export const addWord = (wordDetails) => {
  return {
    type: ADD_WORD,
    payload: { wordDetails },
  };
};

export const removeWord = (wordDetails) => {
  return {
    type: REMOVE_WORD,
    payload: { wordDetails },
  };
};

export const toggleBookmark = (wordDetails, isBookmarked) => {
  return {
    type: TOGGLE_BOOKMARK,
    payload: { wordDetails, isBookmarked },
  };
};

export const toggleArchive = (targetWord) => {
  console.log("target word ", targetWord);
  return {
    type: TOGGLE_ARCHIVE,
    payload: { targetWord },
  };
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
