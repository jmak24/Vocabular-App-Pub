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
import userProfilerReducer from "./store/reducers/userProfile";
import loadingReducer from "./store/reducers/loading";
import AppContainer from "./AppContainer";
import { setupInitWordsState } from "./store/actions/words";
import { setUserProfile } from "./store/actions/userProfile";

import * as mutations from "./amplify/graphql/mutations"; // TO REMOVE
import * as queries from "./amplify/graphql/queries"; // TO REMOVE
import { getPhrasesByDate, syncData } from "./utils/helper"; // TO REMOVE
import { loadUserProfile } from "./store/actions/userProfile";

import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const rootReducer = combineReducers({
  words: wordsReducer,
  toasts: toastsReducer,
  phrases: phrasesReducer,
  userProfile: userProfilerReducer,
  loading: loadingReducer,
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

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const testAPI = async () => {
    try {
      const userId = "d076de4f-8699-4822-bef4-891babcaebaa";
      const words = JSON.stringify([]);
      const archived = JSON.stringify({});
      const res = await syncData({ userId, words, archived });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    store.dispatch(setupInitWordsState());
    store.dispatch(loadUserProfile({ withPhrases: false }));
    authListener();
    // testAPI();
  }, []);

  const authListener = () => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          store.dispatch(loadUserProfile());
          console.log("SIGNED IN");
          break;
        case "signOut":
          store.dispatch(setUserProfile({}));
          console.log("SIGNED OUT");
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("SIGN IN FAILURE", data);
          break;
      }
    });
  };

  // const loadUserProfile = async ({ withPhrases }) => {
  //   const cognitoUser = await Auth.currentAuthenticatedUser();
  //   if (cognitoUser) {
  //     const userId = cognitoUser.username;
  //     const email = cognitoUser.attributes.email;
  //     const userProfileRes = await getUserProfile({
  //       id: userId,
  //       withPhrases,
  //     });
  //     let userProfile = userProfileRes.data.getUserProfile;
  //     console.log(userProfile);
  //     // create user profile (only on first time logging in)
  //     if (userProfile) {
  //       store.dispatch(setUserProfile(userProfile));
  //     } else {
  //       store.dispatch(
  //         handleCreateUserProfile({ id: userId, cognitoUser, email })
  //       );
  //     }
  //   }
  // };

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

export default App;
