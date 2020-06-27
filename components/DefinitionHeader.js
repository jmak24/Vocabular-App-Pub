import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "./CustomText";
import Colors from "../constants/Colors";
import { toggleBookmark } from "../store/actions/words";

const MAX_SCROLL_DISTANCE = -80;
const MAX_TITLE_SCALE = 1.1;
const MAX_LEFT_PADDING = 17;

const DefinitionHeader = ({ wordDetails, isBookmarked, animatedScroll }) => {
  const dispatch = useDispatch();
  const animatedTitleExpand = animatedScroll.interpolate({
    inputRange: [MAX_SCROLL_DISTANCE, 0],
    outputRange: [MAX_TITLE_SCALE, 1],
    extrapolate: "clamp",
  });
  const animatedTitlePad = animatedScroll.interpolate({
    inputRange: [MAX_SCROLL_DISTANCE, 0],
    outputRange: [MAX_LEFT_PADDING, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={{
          paddingLeft: animatedTitlePad,
          transform: [{ scale: animatedTitleExpand }],
        }}
      >
        <CustomText style={styles.wordTitle} option='large'>
          {wordDetails.word}
        </CustomText>
      </Animated.View>
      <View style={styles.topContainer}>
        <View>
          {wordDetails.hasOwnProperty("pronunciation") && (
            <CustomText option='midGray'>
              {wordDetails.pronunciation.all}
            </CustomText>
          )}
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback>
            <Ionicons
              name='ios-volume-high'
              size={37}
              style={styles.icon}
              color={Colors.secondaryText}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => dispatch(toggleBookmark(wordDetails, isBookmarked))}
          >
            <Ionicons
              name={isBookmarked ? "ios-bookmark" : "ios-bookmark"}
              size={32}
              style={{ ...styles.icon, marginRight: 8 }}
              color={isBookmarked ? Colors.primaryTheme : Colors.secondaryText}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  wordTitle: {
    textAlign: "left",
    fontSize: 40,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 32,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default DefinitionHeader;
