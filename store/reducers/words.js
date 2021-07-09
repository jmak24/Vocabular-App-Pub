import {
  SETUP_INIT,
  TOGGLE_BOOKMARK,
  ADD_RECENT_WORD,
  REMOVE_RECENT_WORD,
  TOGGLE_ARCHIVE,
  REMOVE_WORD,
  CLEAR_RECENT_WORDS,
  REMOVE_BOOKMARKED_WORDS,
  REMOVE_ARCHIVED_WORDS,
} from "../actions/words";
// import {
//   WORDS_DATA,
//   ARCHIVED_WORDS_LIST,
//   ARCHIVED_WORDS_EXTENDED,
// } from "../../models/dummy-data";
import { setAsyncStorage } from "../../utils/helper";

export default (state = {}, action) => {
  switch (action.type) {
    case SETUP_INIT: {
      return { ...state, ...action.payload };
    }
    case TOGGLE_BOOKMARK: {
      const { wordDetails, isBookmarked } = action.payload;
      const targetWord = wordDetails.word;
      const updatedWordsData = { ...state.wordsData };
      let updatedWordsBookmarked = [...state.wordsBookmarked];
      if (!isBookmarked) {
        // ADD WORD
        updatedWordsBookmarked.unshift(targetWord);
        updatedWordsData[targetWord] = wordDetails;
      } else {
        // REMOVE WORD
        updatedWordsBookmarked = updatedWordsBookmarked.filter(
          (word) => word !== targetWord
        );
        delete updatedWordsData[targetWord];
      }

      setAsyncStorage("wordsData", updatedWordsData);
      setAsyncStorage("wordsBookmarked", updatedWordsBookmarked);
      return {
        ...state,
        wordsData: updatedWordsData,
        wordsBookmarked: updatedWordsBookmarked,
      };
    }
    
    case TOGGLE_ARCHIVE: {
      const targetWord = action.payload.targetWord;
      const updatedWordsData = { ...state.wordsData };
      let updatedWordsBookmarked = [...state.wordsBookmarked];
      const updatedWordsArchived = { ...state.wordsArchived };
      let updatedWordsArchivedList = [...state.wordsArchivedList];

      const archived = updatedWordsData[targetWord].archived;
      if (!archived) {
        // ARCHIVE WORD
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        updatedWordsArchived[year][month].unshift(targetWord);

        updatedWordsArchivedList.push(targetWord);
        updatedWordsData[targetWord].archived = today;
        updatedWordsBookmarked = updatedWordsBookmarked.filter(
          (word) => word !== targetWord
        );
      } else {
        // UNARCHIVE WORD
        const archivedDate = new Date(archived);
        const month = archivedDate.getMonth();
        const year = archivedDate.getFullYear();
        const archiveRecord = updatedWordsArchived[year][month];
        const index = archiveRecord.indexOf(targetWord);
        if (index > -1) archiveRecord.splice(index, 1);

        updatedWordsArchivedList = updatedWordsArchivedList.filter(
          (word) => word !== targetWord
        );
        updatedWordsData[targetWord].archived = null;
        updatedWordsBookmarked.unshift(targetWord);
      }

      setAsyncStorage("wordsData", updatedWordsData);
      setAsyncStorage("wordsBookmarked", updatedWordsBookmarked);
      setAsyncStorage("wordsArchived", updatedWordsArchived);
      setAsyncStorage("wordsArchivedList", updatedWordsArchivedList);
      return {
        ...state,
        wordsData: updatedWordsData,
        wordsBookmarked: updatedWordsBookmarked,
        wordsArchived: updatedWordsArchived,
        wordsArchivedList: updatedWordsArchivedList,
      };
    }
    case REMOVE_WORD: {
      const { targetWord } = action.payload;
      const updatedWordsData = { ...state.wordsData };
      let updatedWordsBookmarked = [...state.wordsBookmarked];
      let updatedWordsArchived = { ...state.wordsArchived };
      let updatedWordsArchivedList = [...state.wordsArchivedList];

      // REMOVE WORD
      updatedWordsBookmarked = updatedWordsBookmarked.filter(
        (word) => word !== targetWord
      );
      // UNARCHIVE WORD
      const archived = updatedWordsData[targetWord].archived;
      if (archived) {
        const archivedDate = new Date(archived);
        const month = archivedDate.getMonth();
        const year = archivedDate.getFullYear();
        const archiveRecord = updatedWordsArchived[year][month];
        const index = archiveRecord.indexOf(targetWord);
        if (index > -1) archiveRecord.splice(index, 1);
      }
      updatedWordsArchivedList = updatedWordsArchivedList.filter(
        (word) => word !== targetWord
      );
      // DELETE WORD
      delete updatedWordsData[targetWord];

      setAsyncStorage("wordsData", updatedWordsData);
      setAsyncStorage("wordsBookmarked", updatedWordsBookmarked);
      setAsyncStorage("wordsArchived", updatedWordsArchived);
      setAsyncStorage("wordsArchivedList", updatedWordsArchivedList);
      return {
        ...state,
        wordsData: updatedWordsData,
        wordsBookmarked: updatedWordsBookmarked,
        wordsArchived: updatedWordsArchived,
        wordsArchivedList: updatedWordsArchivedList,
      };
    }
    case ADD_RECENT_WORD: {
      const { wordSearched } = action.payload;
      const updatedRecentWords = [...state.recentWords];

      const wordIndex = updatedRecentWords.indexOf(wordSearched);
      if (wordIndex >= 0) updatedRecentWords.splice(wordIndex, 1);

      updatedRecentWords.unshift(wordSearched);

      // Limit # of Recent words to 20
      if (updatedRecentWords.length > 20) updatedRecentWords.pop();

      setAsyncStorage("recentWords", updatedRecentWords);
      return { ...state, recentWords: updatedRecentWords };
    }
    case REMOVE_RECENT_WORD: {
      const { indexToRemove } = action.payload;
      const updatedRecentWords = [...state.recentWords];
      updatedRecentWords.splice(indexToRemove, 1);

      setAsyncStorage("recentWords", updatedRecentWords);
      return { ...state, recentWords: updatedRecentWords };
    }
    case CLEAR_RECENT_WORDS: {
      setAsyncStorage("recentWords", []);
      return { ...state, recentWords: [] };
    }
    case REMOVE_BOOKMARKED_WORDS: {
      const updatedWordsData = { ...state.wordsData };
      const wordsBookmarked = [...state.wordsBookmarked];

      for (let i = 0; i < wordsBookmarked.length; i++) {
        const word = wordsBookmarked[i];
        delete updatedWordsData[word];
      }

      setAsyncStorage("wordsData", updatedWordsData);
      setAsyncStorage("wordsBookmarked", []);
      return { ...state, wordsData: updatedWordsData, wordsBookmarked: [] };
    }
    case REMOVE_ARCHIVED_WORDS: {
      const updatedWordsData = { ...state.wordsData };
      const wordsArchivedList = { ...state.wordsArchived };
      let updatedWordsArchived = {};

      for (let i = 0; i < wordsArchivedList.length; i++) {
        const word = wordsArchivedList[i];
        delete updatedWordsData[word];
      }

      const currentYear = new Date().getFullYear();
      updatedWordsArchived[currentYear] = [];
      for (let i = 0; i < 12; i++) {
        updatedWordsArchived[currentYear].push([]);
      }

      setAsyncStorage("wordsData", updatedWordsData);
      setAsyncStorage("wordsArchived", updatedWordsArchived);
      setAsyncStorage("wordsArchivedList", []);

      return {
        ...state,
        wordsData: updatedWordsData,
        wordsArchived: updatedWordsArchived,
        wordsArchivedList: [],
      };
    }
    default:
      return state;
  }
};
