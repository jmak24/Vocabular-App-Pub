import {
  ADD_WORD,
  REMOVE_WORD,
  TOGGLE_BOOKMARK,
  ADD_RECENT_WORD,
  REMOVE_RECENT_WORD,
  TOGGLE_ARCHIVE,
  CLEAR_RECENT_WORDS,
} from "../actions/words";
import { WORDS_DATA, ARCHIVED_WORDS_LIST } from "../../models/dummy-data";
import { prepareForWordDetails } from "../../utils/helper";

// Prepare Word Details as Section List for initial state
const getSectionListWords = (words) => {
  let mainWords = [],
    archivedWords = [];
  for (wordKey in words) {
    const word = words[wordKey];
    if (word.archived) {
      mainWords.push(wordKey);
    } else {
      archivedWords.push(wordKey);
    }
  }
  return [mainWords, archivedWords];
};
const sectionListWords = getSectionListWords(WORDS_DATA);

// const wordSectionListDataSet = (results) => {
//   const updatedResults = {};
//   for (let i = 0; i < results.length; i++) {
//     const result = results[i];
//     if (result.hasOwnProperty("partOfSpeech")) {
//       const partOfSpeech = result.partOfSpeech;
//       if (updatedResults.hasOwnProperty(partOfSpeech)) {
//         updatedResults[partOfSpeech].push(result);
//       } else {
//         updatedResults[partOfSpeech] = [result];
//       }
//     }
//   }
//   return updatedResults;
// };
// const wordsDataOrganized = (words) => {
//   for (const word in words) {
//     words[word].results = wordSectionListDataSet(words[word].results);
//   }
//   return words;
// };

const wordsDataOrganized = (words) => {
  for (const word in words) {
    prepareForWordDetails(words[word]);
  }
  return words;
};

const WORDS_DATA_ORGANIZED = wordsDataOrganized(WORDS_DATA);

const initialState = {
  wordsList: [
    {
      title: "Main Words",
      data: sectionListWords[0],
    },
    {
      title: "Archived Words",
      data: sectionListWords[1],
    },
  ],
  words: WORDS_DATA_ORGANIZED,
  archivedWordsList: ARCHIVED_WORDS_LIST,
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

export default (state = initialState, action) => {
  let targetWord;
  let updatedWords;
  let updatedWordsList;
  let updatedArchivedList;
  let updatedRecentWords;

  switch (action.type) {
    case TOGGLE_BOOKMARK:
      const { wordDetails, isBookmarked } = action.payload;
      targetWord = wordDetails.word;
      updatedWordsList = [...state.wordsList];
      updatedWords = { ...state.words };

      if (!isBookmarked) {
        // ADD WORD
        updatedWordsList[0].data.push(targetWord);

        updatedWords[targetWord] = wordDetails;
      } else {
        // REMOVE WORD
        delete updatedWords[targetWord];
        const mainWordsList = updatedWordsList[0].data;
        updatedWordsList[0].data = mainWordsList.filter(
          (word) => word !== targetWord
        );
        const archivedWordsList = updatedWordsList[1].data;
        updatedWordsList[1].data = archivedWordsList.filter(
          (word) => word !== targetWord
        );
      }

      return { ...state, wordsList: updatedWordsList, words: updatedWords };

    case TOGGLE_ARCHIVE:
      targetWord = action.payload.targetWord;
      updatedWords = { ...state.words };
      updatedArchivedList = { ...state.archivedWordsList };

      const dateArchived = updatedWords[targetWord].archived;
      if (dateArchived) {
        const month = dateArchived.getMonth();
        const year = dateArchived.getFullYear();
        const archiveRecord = updatedArchivedList[year][month];
        const index = archiveRecord.indexOf(targetWord);
        if (index > -1) archiveRecord.splice(index, 1);

        updatedWords[targetWord].archived = null;
      } else {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        updatedArchivedList[year][month].unshift(targetWord);

        updatedWords[targetWord].archived = today;
      }

      return {
        ...state,
        words: updatedWords,
        archivedWordsList: updatedArchivedList,
      };

    case ADD_RECENT_WORD:
      const { wordSearched } = action.payload;
      updatedRecentWords = [...state.recentWords];

      const wordIndex = updatedRecentWords.indexOf(wordSearched);
      if (wordIndex >= 0) updatedRecentWords.splice(wordIndex, 1);

      updatedRecentWords.unshift(wordSearched);

      // Limit # of Recent words to 20
      if (updatedRecentWords.length > 20) updatedRecentWords.pop();

      return { ...state, recentWords: updatedRecentWords };

    case REMOVE_RECENT_WORD:
      const { indexToRemove } = action.payload;
      updatedRecentWords = [...state.recentWords];
      updatedRecentWords.splice(indexToRemove, 1);

      return { ...state, recentWords: updatedRecentWords };

    case CLEAR_RECENT_WORDS:
      return { ...state, recentWords: [] };

    case ADD_WORD:
      // const updatedWords = state.words;
      // updatedWords[wordDetails.word] = wordDetails;

      // const updatedWordsList = state.wordsList;
      // updatedWordsList[0].data.push(wordDetails.word);

      // return { ...state, words: updatedWordsList, words: updatedWords };
      return state;
    case REMOVE_WORD:
      return state;

    default:
      return state;
  }
};
