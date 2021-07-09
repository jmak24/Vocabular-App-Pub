import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import RootNavigator from "./navigation/RootNavigator.js";
import Toast from "./components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { setupInitWordsState } from "./store/actions/words";
import { setUserProfile, loadUserProfile } from "./store/actions/userProfile";

import Amplify, { Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import { getAsyncStorage, setAsyncStorage } from "./utils/helper.js";

const AppContainer = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(setupInitWordsState());
    dispatch(loadUserProfile());
    authListener();
    // testAPI();
  }, []);

  useEffect(() => {
    const authType = userProfile ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
    console.log(authType);
    Amplify.configure({
      ...awsconfig,
      aws_appsync_authenticationType: authType,
    });
  }, [userProfile]);

  const authListener = () => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          dispatch(loadUserProfile());
          console.log("SIGNED IN");
          break;
        case "signOut":
          dispatch(setUserProfile(null));
          console.log("SIGNED OUT");
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("SIGN IN FAILURE", data);
          break;
      }
    });
  };

  return (
    <View style={styles.container}>
      <RootNavigator />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
