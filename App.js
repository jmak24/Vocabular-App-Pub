import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AppLoading from "expo-app-loading";
import { composeWithDevTools } from "redux-devtools-extension";
import * as Font from "expo-font";

import wordsReducer from "./store/reducers/words";
import toastsReducer from "./store/reducers/toasts";
import phrasesReducer from "./store/reducers/phrases";
import AppContainer from "./AppContainer";
import { setupInitWordsState } from "./store/actions/words";

import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

import {
  createUser,
  createPhrase,
  deletePhrase,
  updatePhraseLikes,
  updatePhraseVisibility,
  getUser,
  getPhrasesByUser,
  getPhrasesByLikes,
  getPhrasesByDate,
} from "./utils/helper";

const rootReducer = combineReducers({
  words: wordsReducer,
  toasts: toastsReducer,
  phrases: phrasesReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
  return Font.loadAsync({
    "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
    "poppins-reg": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    store.dispatch(setupInitWordsState());
    testAPI();
  }, []);

  const testAPI = async () => {
    try {
      // CREATE USER
      const userDetails = {
        userTag: "jmak",
        email: "makjonathan@hotmail.com",
        words: JSON.stringify({ bookmarked: [], archived: [] }),
        createdAt: new Date(),
      };
      // id: "bae8ad68-b36a-4adb-868d-7ffbbda1c18b"
      const userDetails2 = {
        userTag: "pandabox",
        email: "pbox@hotmail.com",
        words: JSON.stringify({ bookmarked: [], archived: [] }),
        createdAt: new Date(),
      };
      const userDetails3 = {
        userTag: "djdannyd",
        email: "djdannyd@hotmail.com",
        words: JSON.stringify({ bookmarked: [], archived: [] }),
        createdAt: new Date(),
      };
      // id: "8aca195a-2932-4e78-94ae-0a74500d4a5a"
      // const newUser = await createUser({ user: userDetails3 });
      // console.log("newUser:", newUser);

      // GET USER
      // const user = await getUser({
      //   userId: "bae8ad68-b36a-4adb-868d-7ffbbda1c18b",
      // });
      // console.log("user:", user);

      // CREATE PHRASE
      const phraseDetails1 = {
        word: "amplify",
        phrase: "I love AWS Amplify",
        numLikes: 2,
        likes: JSON.stringify(["timmyturner", "xblader"]),
        authorId: "bae8ad68-b36a-4adb-868d-7ffbbda1c18b",
        authorTag: "jmak",
        isPublic: true,
        createdAt: new Date(),
        type: "Phrase",
      };
      const phraseDetails2 = {
        word: "anarchy",
        phrase: "Anarchy broke out after the election results",
        numLikes: 0,
        likes: JSON.stringify([""]),
        authorId: "bae8ad68-b36a-4adb-868d-7ffbbda1c18b",
        authorTag: "jmak",
        isPublic: true,
        createdAt: new Date(),
        type: "Phrase",
      };
      // const newPhrase = await createPhrase({ phrase: phraseDetails2 });
      // console.log("newPhrase:", newPhrase);

      // DELETE A PHRASE
      // const deletedPhrase = await deletePhrase({
      //   phraseId: "6437076b-d00e-43d9-bdc7-0ce3a23e6661",
      // });
      // console.log(deletedPhrase);

      // LIKE A PHRASE
      // const updatedPhrase = await updatePhraseLikes({
      //   phraseId: "5ab4ff9d-7925-4e96-a8e6-443221dae4e1",
      //   userId: "421f53bb-fcaf-4730-95be-509713d768b9",
      //   likes: JSON.stringify([]),
      // });
      // console.log(updatedPhrase);

      // UPDATE PHRASE VISIBILITY
      // const updatedPhrase = await updatePhraseVisibility({
      //   phraseId: "96669e33-62f2-4212-890e-e621b3acb1cc",
      //   isPublic: false,
      // });
      // console.log(updatedPhrase);

      // GET PHRASE BY USER
      // const phraseByUser = await getPhrasesByUser({
      //   userId: "bae8ad68-b36a-4adb-868d-7ffbbda1c18b",
      //   word: "amplify",
      // });
      // console.log(phraseByUser);

      // GET PHRASE BY MOST LIKES
      // const phraseByLikes = await getPhrasesByLikes({ word: "amplify" });
      // console.log(phraseByLikes);

      // GET PRASE BY MOST RECENT
      // const phrasesByDate = await getPhrasesByDate({ word: "anarchy" });
      // console.log(phrasesByDate);
    } catch (err) {
      console.log(err.errors);
    }
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.error}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
