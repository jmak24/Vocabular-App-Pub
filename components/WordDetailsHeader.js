import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "./CustomText";
import Colors from "../constants/Colors";
import {
  toggleArchive,
  toggleBookmark,
  removeWord,
} from "../store/actions/words";
import { setToast } from "../store/actions/toasts";

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

  const removePressed = () => {
    dispatch(
      setToast(
        "toastInfo",
        "Removed from Archive and Bookmarks",
        "ios-bookmark"
      )
    );
    dispatch(removeWord(wordDetails));
  };

  const archivePressed = () => {
    const toastMsg = isArchived ? "Removed from Archive" : "Moved to Archive";
    dispatch(setToast("toastInfo", toastMsg, "ios-archive"));
    dispatch(toggleArchive(wordDetails, isArchived));
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
          <TouchableOpacity onPress={removePressed}>
            <Ionicons
              // name={"ios-close-circle-outline"}
              name={"ios-remove-circle-outline"}
              size={32}
              style={{ ...styles.icon, marginRight: 8 }}
              color='#f26f6f'
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
