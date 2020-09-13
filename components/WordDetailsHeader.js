import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "./CustomText";
import Colors from "../constants/Colors";
import { toggleArchive, toggleBookmark } from "../store/actions/words";
import { setToast } from "../store/actions/toasts";

const MAX_SCROLL_DISTANCE = -200;
const MAX_TITLE_SCALE = 1.15;
const MAX_LEFT_PADDING = 23;

const WordDetailsHeader = ({
  wordDetails,
  isArchived,
  isBookmarked,
  scrollY,
}) => {
  const dispatch = useDispatch();
  const HeaderHeight = useRef(131);

  const animatedContainer = scrollY.interpolate({
    inputRange: [0, HeaderHeight.current],
    outputRange: [0, -HeaderHeight.current],
    extrapolate: "clamp",
  });

  const initHeaderHeight = (event) => {
    HeaderHeight.current = event.nativeEvent.layout.height;
  };

  const bookmarkPressed = () => {
    const toastMsg = isBookmarked
      ? "Removed from Bookmarks!"
      : "Added to Bookmarks!";
    dispatch(setToast("toastInfo", toastMsg, "ios-bookmark"));
    dispatch(toggleBookmark(wordDetails, isBookmarked));
  };

  const archivePressed = () => {
    const toastMsg = isArchived ? "Removed from Archive!" : "Moved to Archive!";
    dispatch(setToast("toastInfo", toastMsg, "ios-archive"));
    dispatch(toggleArchive(wordDetails.word, isArchived));
  };

  return (
    <Animated.View
      onLayout={(e) => initHeaderHeight(e)}
      style={[
        styles.headerContainer,
        { transform: [{ translateY: animatedContainer }] },
      ]}
    >
      <View>
        <CustomText style={styles.wordTitle} option='large'>
          {wordDetails.word}
        </CustomText>
      </View>
      <View style={styles.topContainer}>
        <View>
          {wordDetails.hasOwnProperty("pronunciation") && (
            <CustomText option='midGray'>
              {wordDetails.pronunciation.all}
            </CustomText>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          {isBookmarked && (
            <TouchableOpacity onPress={archivePressed}>
              <View style={{ ...styles.archiveBtn }}>
                <CustomText option='bodyGray'>
                  {isArchived ? "Archived" : "Archive"}
                </CustomText>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={bookmarkPressed}>
            <Ionicons
              name={isBookmarked ? "ios-bookmark" : "ios-bookmark"}
              size={32}
              style={{ ...styles.icon, marginRight: 8 }}
              color={isBookmarked ? Colors.primaryTheme : Colors.iconLightGray}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

WordDetailsHeader.propTypes = {
  wordDetails: PropTypes.object.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  scrollY: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

const styles = StyleSheet.create({
  wordTitle: {
    textAlign: "left",
    fontSize: 40,
  },
  headerContainer: {
    left: 20,
    right: 20,
    position: "absolute",
    zIndex: 100,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 28,
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

export default WordDetailsHeader;
