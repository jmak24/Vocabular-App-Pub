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
import { toggleArchive, toggleBookmark } from "../store/actions/words";

const MAX_SCROLL_DISTANCE = -80;
const MAX_TITLE_SCALE = 1.1;
const MAX_LEFT_PADDING = 17;

const DefinitionHeader = ({
  wordDetails,
  isArchived,
  isBookmarked,
  animatedScroll,
}) => {
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
          {isArchived && (
            <TouchableWithoutFeedback
              onPress={() => dispatch(toggleArchive(wordDetails.word))}
            >
              <View style={styles.archiveBtn}>
                <CustomText option='bodyGray'>
                  {isArchived ? "Archived" : "Archive"}
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          )}
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
  archiveBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: Colors.secondaryText,
    borderWidth: 1,
  },
  icon: {
    marginLeft: 15,
  },
});

export default DefinitionHeader;
