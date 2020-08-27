import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import CustomText from "../components/CustomText";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const WordNotFound = ({ word, navigation }) => (
  <View
    style={{
      ...styles.screen,
      paddingTop: 95,
      alignItems: "center",
    }}
  >
    <View style={{ ...styles.topStrip, paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Ionicons
          name={"ios-arrow-back"}
          size={32}
          style={{ ...styles.backArrow, top: 50 }}
          color={Colors.secondaryText}
        />
      </TouchableWithoutFeedback>
    </View>
    <CustomText option='subLargeGray' style={{ ...styles.questionMark }}>
      ?
    </CustomText>
    <CustomText option='subLarge' style={styles.blockText}>
      {word}
    </CustomText>
    <CustomText option='midGray' style={styles.blockText}>
      Oops, the word you're looking for does not exist.
    </CustomText>
  </View>
);

WordNotFound.propTypes = {
  word: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.grayTint,
  },
  topStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 95,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.grayTint,
  },
  backArrow: {
    position: "absolute",
    left: 20,
    width: 25,
  },
  blockText: {
    marginTop: 20,
    textAlign: "center",
  },
  questionMark: {
    fontSize: 90,
    marginTop: 120,
  },
});

export default WordNotFound;
