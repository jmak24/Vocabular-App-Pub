import {
  SETUP_INIT,
  TOGGLE_BOOKMARK,
  ADD_RECENT_WORD,
  REMOVE_RECENT_WORD,
  TOGGLE_ARCHIVE,
  CLEAR_RECENT_WORDS,
} from "../actions/words";
import {
  WORDS_DATA,
  ARCHIVED_WORDS_LIST,
  ARCHIVED_WORDS_EXTENDED,
} from "../../models/dummy-data";
import { prepareForWordDetails, setAsyncStorage } from "../../utils/helper";

// Prepare Bookmarked and Archived Word Lists
const prepareWordsList = (words) => {
  let mainWords = [],
    archivedWords = [];
  for (wordKey in words) {
    const word = words[wordKey];
    if (word.archived) {
      archivedWords.push(wordKey);
    } else {
      mainWords.push(wordKey);
    }
  }
  archivedWords = archivedWords.concat(ARCHIVED_WORDS_EXTENDED); // TO DELETE
  return { main: mainWords, archived: archivedWords };
};
const wordsList = prepareWordsList(WORDS_DATA);

const wordsDataOrganized = (words) => {
  for (const word in words) {
    prepareForWordDetails(words[word]);
  }
  return words;
};

const WORDS_DATA_ORGANIZED = wordsDataOrganized(WORDS_DATA);

const initialState1 = {
  words: WORDS_DATA_ORGANIZED,
  wordsList: wordsList.main,
  archivedWordsList: wordsList.archived,
  archivedWords: ARCHIVED_WORDS_LIST,
  recentWords: [
    "pragmatic",
    "detrimental",
    "tabulate",
    "triage",
    "conflate",
    "counter",
    "cryptic",
    "tyranny",
    "lament",
    "stipulate",
    "capitulate",
  ],
};

export default (state = {}, action) => {
  // let targetWord;
  // let updatedWords;
  // let updatedWordsList;
  // let updatedArchivedWords;
  // let updatedRecentWords;

  switch (action.type) {
    case SETUP_INIT: {
      return { ...state, ...action.payload };
    }
    case TOGGLE_BOOKMARK: {
      const { wordDetails, isBookmarked } = action.payload;
      const targetWord = wordDetails.word;
      const updatedWords = { ...state.words };
      let updatedWordsList = [...state.wordsList];
      let updatedArchivedWords = { ...state.archivedWords };
      let updatedArchivedWordsList = [...state.archivedWordsList];
      console.log("targetWord:", targetWord);
      if (!isBookmarked) {
        // ADD WORD
        updatedWordsList.unshift(targetWord);

        updatedWords[targetWord] = wordDetails;
      } else {
        const dateArchived = updatedWords[targetWord].archived;
        // REMOVE WORD
        delete updatedWords[targetWord];
        updatedWordsList = updatedWordsList.filter(
          (word) => word !== targetWord
        );
        // UNARCHIVE WORD
        if (dateArchived) {
          const month = dateArchived.getMonth();
          const year = dateArchived.getFullYear();
          const archiveRecord = updatedArchivedWords[year][month];
          const index = archiveRecord.indexOf(targetWord);
          if (index > -1) archiveRecord.splice(index, 1);
        }
        updatedArchivedWordsList = updatedArchivedWordsList.filter(
          (word) => word !== targetWord
        );
      }

      setAsyncStorage("words", updatedWords);
      setAsyncStorage("wordsList", updatedWordsList);
      setAsyncStorage("archivedWordList", updatedArchivedWordsList);
      return {
        ...state,
        wordsList: updatedWordsList,
        words: updatedWords,
        archivedWordsList: updatedArchivedWordsList,
      };
    }
    case TOGGLE_ARCHIVE: {
      const targetWord = action.payload.targetWord;
      const updatedWords = { ...state.words };
      let updatedWordsList = [...state.wordsList];
      const updatedArchivedWords = { ...state.archivedWords };
      const updatedArchivedWordsList = [...state.archivedWordsList];

      const dateArchived = updatedWords[targetWord].archived;
      if (!dateArchived) {
        // ARCHIVE WORD
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        updatedArchivedWords[year][month].unshift(targetWord);

        updatedArchivedWordsList.push(targetWord);
        updatedWords[targetWord].archived = today;
        updatedWordsList = updatedWordsList.filter(
          (word) => word !== targetWord
        );
      } else {
        // UNARCHIVE WORD
        const month = dateArchived.getMonth();
        const year = dateArchived.getFullYear();
        const archiveRecord = updatedArchivedWords[year][month];
        const index = archiveRecord.indexOf(targetWord);
        if (index > -1) archiveRecord.splice(index, 1);

        updatedArchivedWordsList.filter((word) => word !== targetWord);
        updatedWords[targetWord].archived = null;
        updatedWordsList.unshift(targetWord);
      }

      setAsyncStorage("words", updatedWords);
      setAsyncStorage("wordsList", updatedWordsList);
      setAsyncStorage("archivedWords", updatedArchivedWords);
      setAsyncStorage("archivedWordsList", updatedArchivedWordsList);
      return {
        ...state,
        words: updatedWords,
        wordsList: updatedWordsList,
        archivedWords: updatedArchivedWords,
        archivedWordsList: updatedArchivedWordsList,
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
      setAsyncStorage("recentWords", "");
      return { ...state, recentWords: [] };
    }
    default:
      return state;
  }
};
