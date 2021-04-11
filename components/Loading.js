import React from "react";
import { View, Image, StyleSheet } from "react-native";

import LoadingIcon from "../assets/loading.gif";

const SIZE = 80;

const Loading = () => (
  <View style={styles.screen}>
    <Image style={styles.icon} source={LoadingIcon} />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: SIZE,
    width: SIZE,
  },
});

export default Loading;
