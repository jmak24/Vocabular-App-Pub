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
import { setUserProfile, loadUserProfile } from "./store/actions/userProfile";

// import * as mutations from "./amplify/graphql/mutations"; // TO REMOVE
// import * as queries from "./amplify/graphql/queries"; // TO REMOVE
// import { getPhrasesByDate, syncData } from "./utils/helper"; // TO REMOVE

import Amplify, { Hub } from "aws-amplify";
import awsconfig from "./aws-exports";

// Amplify.configure(awsconfig);

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
  const { useProfile: authedUser } = store.getState();

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
    store.dispatch(loadUserProfile());
    authListener();
    // testAPI();
  }, []);

  useEffect(() => {
    const authType = authedUser ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
    console.log(authType);
    Amplify.configure({
      ...awsconfig,
      aws_appsync_authenticationType: authType,
    });
  }, [authedUser]);

  const authListener = () => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          store.dispatch(loadUserProfile());
          console.log("SIGNED IN");
          break;
        case "signOut":
          store.dispatch(setUserProfile(null));
          console.log("SIGNED OUT");
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("SIGN IN FAILURE", data);
          break;
      }
    });
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

export default App;
