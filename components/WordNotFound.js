import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import CustomText from "../components/CustomText";
import Sizing from "../constants/Sizing";
import TopNavBar from "../components/TopNavBar";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const WordNotFound = ({ word, navigation }) => (
  <View
    style={{
      ...styles.screen,
      paddingTop: Sizing.topNavBarHeight,
      alignItems: "center",
    }}
  >
    <TopNavBar navigation={navigation} />
    <View style={{ marginTop: "50%" }}>
      <CustomText option='subLargeGray' style={{ ...styles.questionMark }}>
        ?
      </CustomText>
      <CustomText option='subLarge' style={styles.blockText}>
        {word}
      </CustomText>
      <CustomText option='midGray' style={styles.blockText}>
        Oops, the word you're looking for was not found.
      </CustomText>
    </View>
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
  blockText: {
    marginTop: 20,
    textAlign: "center",
  },
  questionMark: {
    fontSize: 90,
    textAlign: "center",
  },
});

export default WordNotFound;
