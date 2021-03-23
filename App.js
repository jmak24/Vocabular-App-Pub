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
// import Amplify from "aws-amplify";
// import config from "./aws-exports";
// Amplify.configure(config);

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
  }, []);

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
