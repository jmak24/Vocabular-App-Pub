import "react-native-get-random-values";
import { nanoid } from "nanoid/async/index.native";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { API, Auth, graphqlOperation } from "aws-amplify";
import * as mutations from "../amplify/graphql/mutations";
import * as queries from "../amplify/graphql/queries";

import { SPEECH_TYPES } from "../constants/OrderedItems";

const wordsAPIurl = "https://wordsapiv1.p.rapidapi.com";
const rapidapiHost = "wordsapiv1.p.rapidapi.com";
const rapidapiKey = "003083cb60mshf221133e954e641p19ce9bjsnf315a270c0e0";

const dataMuseAPIurl = "https://api.datamuse.com";
const suggestedQuery = "/sug?s=";

// Generate UUID
export const generateUUID = async () => {
  return await nanoid();
};

// Native method to remove keys from object
export const omit = (keyToOmit, { [keyToOmit]: _, ...omittedPropObj } = {}) =>
  omittedPropObj;

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
export const apiWordSearch = async (word) => {
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
    if (err) console.log(err.response);
  }
};

// Web service call to DataMuse API
// Pulls suggested words based on keyword
export const apiSuggestedWords = async (keyword) => {
  try {
    const url = dataMuseAPIurl + suggestedQuery + keyword;
    const response = await axios.get(url);
    const suggestedWords = response.data.map((item) => item.word);
    return suggestedWords;
  } catch (err) {
    if (err) console.log(err);
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

// AWS GraphQL Queries & Mutations

// CREATE USER
export const createUser = async ({ user }) => {
  try {
    return await API.graphql(
      graphqlOperation(mutations.createUser, { input: user })
    );
  } catch (err) {
    console.log(err);
  }
};

// CREATE PHRASE
export const createPhrase = ({ phrase }) => {
  console.log(phrase);
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
    numLikes: likes.length,
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
  return API.graphql(
    graphqlOperation(queries.phrasesByUser, {
      authorId,
      filter: { word: { eq: word } },
      sortDirection: "DESC",
    })
  );
};

// GET PHRASES BY MOST LIKES
export const getPhrasesByLikes = ({ word }) => {
  // need to exclude isPublic = false
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
  // need to exclude isPublic = false
  return await API.graphql(
    graphqlOperation(queries.phrasesByDate, {
      word,
      isPublic: { eq: true },
      sortDirection: "DESC",
    })
  );
};
