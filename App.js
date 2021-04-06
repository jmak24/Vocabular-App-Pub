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
import AppContainer from "./AppContainer";
import { setupInitWordsState } from "./store/actions/words";
import {
  SET_USER_PROFILE,
  CLEAR_USER_PROFILE,
  setUserProfile,
  clearUserProfile,
} from "./store/actions/userProfile";

import { Auth } from "aws-amplify"; // TO REMOVE
import * as mutations from "./amplify/graphql/mutations"; // TO REMOVE
import * as queries from "./amplify/graphql/queries"; // TO REMOVE
import { getUserProfile } from "./utils/helper";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const rootReducer = combineReducers({
  words: wordsReducer,
  toasts: toastsReducer,
  phrases: phrasesReducer,
  userProfile: userProfilerReducer,
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

  useEffect(() => {
    store.dispatch(setupInitWordsState());
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      if (cognitoUser) {
        const userId = cognitoUser.username;
        const userProfileRes = await getUserProfile({ id: userId });
        const userProfile = userProfileRes.data.getUserProfile;
        console.log("APP - userProfile", userProfile);
        store.dispatch(setUserProfile(userProfile));
      } else {
        store.dispatch(clearUserProfile());
      }
    } catch (err) {
      console.log(err);
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

export default App;
