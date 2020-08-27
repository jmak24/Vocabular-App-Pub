import React from "react";
import { View, Image, StyleSheet } from "react-native";

import LoadingIcon from "../assets/loading.svg";

const Loading = () => (
  <View style={styles.screen}>
    <Image style={styles.icon} source={LoadingIcon} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 1000,
    height: 1000,
  },
});

export default Loading;
