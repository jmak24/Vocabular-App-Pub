import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { addRecentWord } from "../store/actions/words";
import CustomText from "../components/CustomText";
import DefinitionSectionList from "../components/DefinitionSectionList";
import WordNotFound from "../components/WordNotFound";
import { apiWordSearch, prepareForWordDetails } from "../utils/helper";
import Colors from "../constants/Colors";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
// Animation Constants
const MAX_SCROLL_DISTANCE = 90;
const TITLE_OFFSET_Y = 40;

const WordDetailsScreen = ({ route, navigation }) => {
  const { word } = route.params;
  const savedWordDetails = useSelector((state) => state.words.words);
  const dispatch = useDispatch();

  const [wordDetails, setWordDetails] = useState({});
  const animatedScroll = useRef(new Animated.Value(0)).current;
  const isBookmarked = savedWordDetails.hasOwnProperty(word);
  const isArchived = savedWordDetails.archived !== null;

  const animatedTopTitle = animatedScroll.interpolate({
    inputRange: [0, MAX_SCROLL_DISTANCE],
    outputRange: [TITLE_OFFSET_Y, 0],
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
        console.log("TEST");
        setWordDetails(savedWordDetails[word]);
      } else {
        console.log("Pulling word data...");
        const wordData = await apiWordSearch(word);

        prepareForWordDetails(wordData);

        setWordDetails(wordData);
        console.log("recent word added");
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
              color={Colors.secondaryText}
            />
          </TouchableWithoutFeedback>
          <Animated.View style={{ marginTop: animatedTopTitle }}>
            <CustomText option='mid'>{word}</CustomText>
          </Animated.View>
        </View>
        {wordDetailsLoaded && (
          <DefinitionSectionList
            wordDetails={wordDetails}
            selectWordHandler={selectWordHandler}
            animatedScroll={animatedScroll}
            isBookmarked={isBookmarked}
            isArchived={isArchived}
          />
        )}
      </View>
    );
    // Word Details failed to load
  } else {
    return <WordNotFound word={word} navigation={navigation} />;
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20,
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
  },
  backArrow: {
    position: "absolute",
    left: 20,
    width: 25,
  },
});

export default WordDetailsScreen;
