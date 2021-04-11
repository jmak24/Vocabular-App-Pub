import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { addRecentWord } from "../store/actions/words";
import { fetchWordDetails } from "../store/actions/loading";
import { handleLoadPhrases, cleanupPhrases } from "../store/actions/phrases";
import CustomText from "../components/CustomText";
import WordNotFound from "../components/WordNotFound";
import WordDetailsTabNavigator from "../components/WordDetailsTabNavigator";
import WordDetailsHeader from "../components/WordDetailsHeader";
import {
  fetchApiWord,
  prepareForWordDetails,
  objIsNotEmpty,
} from "../utils/helper";
import Colors from "../constants/Colors";
import Sizing from "../constants/Sizing";
import Loading from "../components/Loading";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
// Animation Constants
const MAX_SCROLL_DISTANCE = 140;
const TITLE_OFFSET_Y = 40;

const WordDetailsScreen = ({ route, navigation }) => {
  const { word } = route.params;
  const {
    words: { wordsData },
    loading: { FETCH_WORD_DETAILS },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [wordDetails, setWordDetails] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;
  const isBookmarked = wordsData.hasOwnProperty(word);
  const isArchived =
    wordsData.hasOwnProperty(word) && wordsData[word].archived != null;

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
    loadWordDetails(word); // load word details

    dispatch(handleLoadPhrases({ word })); // load phrases on mount
    return () => {
      dispatch(cleanupPhrases()); // clear phrases on unmount
    };
  }, []);

  const selectWordHandler = async (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  const loadWordDetails = async (word) => {
    // word details are saved locally
    if (isBookmarked) {
      console.log("Retrieving from saved words...");
      setWordDetails(wordsData[word]);
      return;
    }
    // fetch word details from WordsAPI
    try {
      console.log("Pulling word data...");
      dispatch(fetchWordDetails("REQUEST"));
      const wordData = await fetchApiWord(word);
      prepareForWordDetails(wordData);
      setWordDetails(wordData);

      // dispatch fetch word details SUCCESS
      dispatch(fetchWordDetails("SUCCESS"));
      dispatch(addRecentWord(word));
    } catch (err) {
      if (err) console.log("Failed to load Word - ", err);
      // dispatch fetch word details FAILURE
      dispatch(fetchWordDetails("FAIL"));
      setWordDetails(null);
      console.log(err);
    }
  };

  const mainSection = () => {
    if (objIsNotEmpty(wordDetails)) {
      // Word details fetched or retrieved from saved wordsData
      return (
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
      );
    } else if (FETCH_WORD_DETAILS.loading) {
      // Fetching word details
      return <Loading />;
    } else if (wordDetails === null) {
      // Word details was not found
      return <WordNotFound word={word} navigation={navigation} />;
    }
  };

  return (
    <View style={{ ...styles.screen, paddingTop: Sizing.topNavBarHeight }}>
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
      {mainSection()}
    </View>
  );
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
