import React from "react";
import { View, StyleSheet } from "react-native";

import RootNavigator from "./navigation/RootNavigator.js";
import Toast from "./components/Toast";

const AppContainer = () => (
  <View style={styles.container}>
    <RootNavigator />
    <Toast />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
