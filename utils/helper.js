import axios from "axios";

import { SPEECH_TYPES } from "../constants/OrderedItems";

const wordsAPIurl = "https://wordsapiv1.p.rapidapi.com";
const rapidapiHost = "wordsapiv1.p.rapidapi.com";
const rapidapiKey = "003083cb60mshf221133e954e641p19ce9bjsnf315a270c0e0";

const dataMuseAPIurl = "https://api.datamuse.com";
const suggestedQuery = "/sug?s=";

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
    if (err) console.log(err);
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
  // Word details has already been configured
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
