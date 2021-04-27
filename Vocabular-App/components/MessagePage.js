import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import CustomText from "./CustomText";
import Sizing from "../constants/Sizing";
import TopNavBar from "./TopNavBar";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const MessagePage = ({ message }) => (
  <View
    style={{
      ...styles.screen,
    }}
  >
    <View style={{ marginTop: "50%" }}>
      <CustomText option='midGray' style={styles.blockText}>
        {message}
      </CustomText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    width: "100%",
  },
  blockText: {
    marginTop: 20,
    textAlign: "center",
  },
  questionMark: {
    fontSize: 90,
    textAlign: "center",
  },
});

export default MessagePage;
