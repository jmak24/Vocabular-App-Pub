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
import { getPhrasesByDate } from "./utils/helper"; // TO REMOVE
import { getUserProfile } from "./utils/helper";

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

  useEffect(() => {
    store.dispatch(setupInitWordsState());
    loadUserProfile();
    authListener();
  }, []);

  const authListener = () => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          loadUserProfile();
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

  const loadUserProfile = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      const userId = cognitoUser.username;
      const userProfileRes = await getUserProfile({ id: userId });
      let userProfile = userProfileRes.data.getUserProfile;
      // create user profile (only on first time logging in)
      if (!userProfile) {
        const userAttributes = await Auth.userAttributes(cognitoUser);
        let userTag;
        for (let i = 0; i < userAttributes.length; i++) {
          if (userAttributes[i].Name === "preferred_username")
            userTag = userAttributes[i].Value;
        }
        const user = {
          id: userId,
          email,
          userTag,
          bookmarkedWords: JSON.stringify([]),
          archivedWords: JSON.stringify({}),
        };
        const createUserProfileRes = await createUserProfile({ user });
        userProfile = createUserProfileRes.data.createUserProfile;
        console.log("New user profile created in Amplify");
      }

      // console.log("APP - loadUserProfile", userProfile);
      store.dispatch(setUserProfile(userProfile));
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
