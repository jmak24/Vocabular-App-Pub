import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { addRecentWord } from "../store/actions/words";
import CustomText from "../components/CustomText";
import WordNotFound from "../components/WordNotFound";
import WordDetailsTabNavigator from "../components/WordDetailsTabNavigator";
import WordDetailsHeader from "../components/WordDetailsHeader";
import { apiWordSearch, prepareForWordDetails } from "../utils/helper";
import Colors from "../constants/Colors";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
// Animation Constants
const MAX_SCROLL_DISTANCE = 140;
const TITLE_OFFSET_Y = 40;

const WordDetailsScreen = ({ route, navigation }) => {
  const { word } = route.params;
  const savedWordDetails = useSelector((state) => state.words.words);
  const dispatch = useDispatch();

  const [wordDetails, setWordDetails] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;
  const isBookmarked = savedWordDetails.hasOwnProperty(word);
  const isArchived =
    savedWordDetails.hasOwnProperty(word) &&
    savedWordDetails[word].archived !== undefined &&
    savedWordDetails[word].archived !== null;

  const animatedTopTitle = scrollY.interpolate({
    inputRange: [0, MAX_SCROLL_DISTANCE],
    outputRange: [TITLE_OFFSET_Y, 0],
    extrapolate: "clamp",
  });

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, MAX_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    pullWordData(word);
  }, []);

  const selectWordHandler = async (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  const pullWordData = async (word) => {
    try {
      if (isBookmarked) {
        console.log("Retrieving from saved words...");
        setWordDetails(savedWordDetails[word]);
      } else {
        console.log("Pulling word data...");
        const wordData = await apiWordSearch(word);

        prepareForWordDetails(wordData);

        setWordDetails(wordData);
        dispatch(addRecentWord(word));
      }
    } catch (err) {
      if (err) console.log("Failed to load Word - ", err);
      setWordDetails(null);
    }
  };

  // Word Details Successfully loaded
  if (wordDetails) {
    const wordDetailsLoaded = Object.keys(wordDetails).length > 0;

    return (
      <View style={{ ...styles.screen, paddingTop: 95 }}>
        <View
          style={{
            ...styles.topStrip,
            height: 95,
            paddingTop: 50,
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons
              name={"ios-arrow-back"}
              size={32}
              style={{ ...styles.backArrow, top: 50 }}
              color={Colors.iconGray}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{ marginTop: animatedTopTitle, opacity: animatedOpacity }}
          >
            <CustomText option='mid'>{word}</CustomText>
          </Animated.View>
        </View>
        {wordDetailsLoaded && (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: Colors.grayTint,
            }}
          >
            <WordDetailsHeader
              wordDetails={wordDetails}
              isBookmarked={isBookmarked}
              isArchived={isArchived}
              scrollY={scrollY}
            />
            <WordDetailsTabNavigator
              wordDetails={wordDetails}
              selectWordHandler={selectWordHandler}
              scrollY={scrollY}
            />
          </View>
        )}
      </View>
    );
    // Word Details failed to load
  } else {
    return <WordNotFound word={word} navigation={navigation} />;
  }
};

WordDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: Colors.grayTint,
  },
  topStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.grayTint,
    zIndex: 100,
  },
  backArrow: {
    position: "absolute",
    left: 20,
    width: 25,
  },
});

export default WordDetailsScreen;
