import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../amplify/graphql/mutations";
import * as queries from "../amplify/graphql/queries";
import { Share } from "react-native";

import { SPEECH_TYPES } from "../constants/OrderedItems";
import { setToast } from "../store/actions/toasts";

const wordsAPIurl = "https://wordsapiv1.p.rapidapi.com";
const rapidapiHost = "wordsapiv1.p.rapidapi.com";
const rapidapiKey = "003083cb60mshf221133e954e641p19ce9bjsnf315a270c0e0";

const dataMuseAPIurl = "https://api.datamuse.com";
const suggestedQuery = "/sug?s=";

// Native method to remove prop from object
export const omitProp = (
  propToOmit,
  { [propToOmit]: _, ...omittedPropObj } = {}
) => omittedPropObj;

// Check if object is empty
export const objIsNotEmpty = (myObject) => {
  return (
    myObject &&
    Object.keys(myObject).length > 0 &&
    myObject.constructor === Object
  );
};

// Convert Array of Phrases to Object
export const phrasesToObj = (phrasesArr) => {
  const phrasesObj = {};
  for (let i = 0; i < phrasesArr.length; i++) {
    const phrase = phrasesArr[i];
    phrase.likes = JSON.parse(phrase.likes);
    phrasesObj[phrase.id] = phrase;
  }
  return phrasesObj;
};

// Store Local Async Storage
export const setAsyncStorage = async (storageKey, value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(storageKey, jsonValue);
};

// Get Local Async Storage
export const getAsyncStorage = async (storageKey) => {
  const value = await AsyncStorage.getItem(storageKey);
  if (value !== null) return JSON.parse(value);
};

// Web service call to WordsAPI (API key required)
// Retrieves definition data from WordsAPI
export const fetchApiWord = async (word) => {
  const config = {
    headers: {
      "x-rapidapi-host": rapidapiHost,
      "x-rapidapi-key": rapidapiKey,
    },
  };
  try {
    const url = wordsAPIurl + "/words/" + word;
    const response = await axios.get(url, config);
    return response.data;
  } catch (err) {
    if (err) console.log("apiWordSerch:", err.response);
  }
};

// Web service call to DataMuse API
// Pulls suggested words based on keyword
export const fetchSuggestedWords = async (keyword) => {
  try {
    const url = dataMuseAPIurl + suggestedQuery + keyword;
    const response = await axios.get(url);
    const suggestedWords = response.data.map((item) => item.word);
    return suggestedWords;
  } catch (err) {
    if (err) console.log("fetchSuggestedWords:", err);
  }
};

// Prepare definition data for Word Details screen
// Organize results by speech type to be consumed for SectionList component
export const prepareForWordDetails = (word) => {
  // End - Word details has already been configured
  if (word.results[0].hasOwnProperty("data")) return;

  try {
    let updatedResults = [];
    for (let i = 0; i < word.results.length; i++) {
      const result = word.results[i];
      if (result.hasOwnProperty("partOfSpeech")) {
        const speechType = result.partOfSpeech;
        let speechIndex = SPEECH_TYPES.findIndex((item) => item === speechType);
        speechIndex = speechIndex >= 0 ? speechIndex : SPEECH_TYPES.length + 1;

        if (updatedResults[speechIndex]) {
          updatedResults[speechIndex].data.push(result);
        } else {
          updatedResults[speechIndex] = { title: speechType, data: [result] };
        }
      }
    }
    updatedResults = updatedResults.filter((item) => item !== undefined);
    word.results = updatedResults;
  } catch (err) {
    if (err) console.log(err);
  }
};

// Share function
export const onShare = (content) => async (dispatch) => {
  try {
    const result = await Share.share(content);
    if (result.action === Share.sharedAction) {
      if (result.activityType.includes("CopyToPasteboard")) {
        dispatch(
          setToast("toastInfo", "Copied to Clipboard", "ios-copy-sharp")
        );
      }
    }
  } catch (error) {
    dispatch(setToast("toastError", error.message, "ios-close-circle"));
  }
};

// AWS GraphQL Queries & Mutations

// GET USER PROFILE
export const getUserProfile = async ({ id }) => {
  try {
    return await API.graphql(
      graphqlOperation(queries.getUserProfile, {
        id,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

// CREATE USER PROFILE
export const createUserProfile = async ({ user }) => {
  try {
    return await API.graphql(
      graphqlOperation(mutations.createUserProfile, { input: user })
    );
  } catch (err) {
    console.log(err);
  }
};

// UPDATE USER PROFILE - userTag, wordsArchived, bookmarkedWords
export const updateUserProfile = async ({
  id,
  userTag,
  bookmarkedWords,
  wordsArchived,
}) => {
  const input = Object.assign(
    { id },
    userTag && { userTag },
    bookmarkedWords && { bookmarkedWords },
    wordsArchived && { wordsArchived }
  );
  return API.graphql(graphqlOperation(mutations.updateUserProfile, { input }));
};

// CREATE PHRASE
export const createPhrase = ({ phrase }) => {
  return API.graphql(
    graphqlOperation(mutations.createPhrase, { input: phrase })
  );
};

// DELETE A PHRASE
export const deletePhrase = ({ phraseId }) => {
  return API.graphql(
    graphqlOperation(mutations.deletePhrase, { input: { id: phraseId } })
  );
};

// UPDATE PHRASE LIKES
export const updatePhraseLikes = ({ phraseId, userId, likes }) => {
  const indexOfUser = likes.indexOf(userId);
  let updatedLikes;
  if (indexOfUser < 0) {
    updatedLikes = likes.concat([userId]); // add user to likes
  } else {
    updatedLikes = likes.filter((id) => id !== userId); // remove user from likes
  }
  const input = {
    id: phraseId,
    likes: JSON.stringify(updatedLikes),
    numLikes: updatedLikes.length,
  };

  return API.graphql(graphqlOperation(mutations.updatePhrase, { input }));
};

// UPDATE PHRASE VISIBILITY
export const updatePhraseVisibility = ({ phraseId, isPublic }) => {
  const input = { id: phraseId, isPublic };
  return API.graphql(graphqlOperation(mutations.updatePhrase, { input }));
};

// GET USER
export const getUser = ({ userId }) => {
  return API.graphql(graphqlOperation(queries.getUser, { id: userId }));
};

// GET PHRASES BY USER ID
export const getPhrasesByUser = ({ userId: authorId, word }) => {
  const inputFilters = {
    authorId,
    sortDirection: "DESC",
  };
  const wordFilter = {
    filter: { word: { eq: word } },
  };
  if (word) Object.assign(inputFilters, wordFilter);
  return API.graphql(graphqlOperation(queries.phrasesByUser, inputFilters));
};

// GET PHRASES BY MOST LIKES
export const getPhrasesByLikes = ({ word }) => {
  return API.graphql(
    graphqlOperation(queries.phrasesByLikes, {
      limit: 5,
      type: "Phrase",
      filter: {
        word: { eq: word },
        isPublic: { eq: true },
      },
      sortDirection: "DESC",
    })
  );
};

// GET PRASES BY MOST RECENT
export const getPhrasesByDate = async ({ word }) => {
  return await API.graphql(
    graphqlOperation(queries.phrasesByDate, {
      limit: 25,
      word,
      filter: {
        isPublic: { eq: true },
      },
      sortDirection: "DESC",
    })
  );
};

// ########### SYNC DATA (LAMABDA FUNCTION) ###########
export const syncData = async ({ userId, words, archived }) => {
  return await API.graphql(graphqlOperation(mutations.syncData), {
    userId,
    words,
    archived,
  });
};
