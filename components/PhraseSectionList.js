import React, { useState, useRef, useEffect, Fragment } from "react";
import {
  View,
  SectionList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

import CustomText from "./CustomText";
import PhraseCard from "./PhraseCard";
import Colors from "../constants/Colors";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const HeaderHeight = 131;
const NavBarHeight = 60;

const phraseData = [
  {
    phrase: "You could hear a slight echo in the caves.",
    likes: 2,
    isVisible: false,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
  {
    phrase: "I echo his sentiment on the new voting system.",
    likes: 5,
    isVisible: true,
  },
];

const PhraseSectionList = ({ forwardRef, scrollY, route }) => {
  const listOffsetY = useRef({});

  return (
    <Animated.ScrollView
      scrollEventThrottle={10}
      style={styles.scrollView}
      scrollIndicatorInsets={{ right: 1 }}
      keyExtractor={(item, index) => index}
      ref={forwardRef}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        {
          useNativeDriver: false,
          listener: (event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const curRoute = route.key;
            listOffsetY.current[curRoute] = offsetY;
            // console.log("2 - offsetY:", offsetY);
          },
        }
      )}
    >
      <Fragment>
        <View style={styles.phraseCategoryBar}>
          <CustomText option='mid'>My Phrases</CustomText>
        </View>
        {phraseData.map((item, index) => {
          index++;
          return <PhraseCard details={item} />;
        })}
        <View style={{ height: 10 + HeaderHeight + NavBarHeight }} />
      </Fragment>
    </Animated.ScrollView>
  );
};

PhraseSectionList.propTypes = {
  phraseData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    paddingTop: 10 + HeaderHeight + NavBarHeight,
    paddingHorizontal: 20,
    backgroundColor: Colors.grayTint,
  },
  phraseCategoryBar: {
    width: "100%",
    alignItems: "flex-start",
    paddingBottom: 10,
    backgroundColor: Colors.grayTint,
  },
  icon: {
    marginHorizontal: 8,
  },
});

export default PhraseSectionList;
