import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import RootNavigator from "./navigation/RootNavigator.js";
import Toast from "./components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { setupInitWordsState } from "./store/actions/words";
import { setUserProfile, loadUserProfile } from "./store/actions/userProfile";

import Amplify, { Hub } from "aws-amplify";
import awsconfig from "./aws-exports";

const AppContainer = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.userProfile);

  // const testAPI = async () => {
  //   try {
  //     const userId = "d076de4f-8699-4822-bef4-891babcaebaa";
  //     const words = JSON.stringify([]);
  //     const archived = JSON.stringify({});
  //     const res = await syncData({ userId, words, archived });
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    dispatch(setupInitWordsState());
    dispatch(loadUserProfile());
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
