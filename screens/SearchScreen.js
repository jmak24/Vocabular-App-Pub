import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { removeRecentWord, clearAllRecentWords } from "../store/actions/words";
import SearchBar from "../components/SearchBar";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";

const DISPLAY_STATE = {
  recent: { state: "recent", msg: "Recent Words" },
  suggested: { state: "suggested", msg: "Suggested Words" },
  noResults: { state: "noResults", msg: "No Results found for" },
  empty: { state: "empty", msg: "Start Learning New Words" },
  loading: { state: "loading" },
};

const SearchScreen = ({ navigation }) => {
  const [displayState, setDisplayState] = useState(DISPLAY_STATE.recent.state);
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [noResults, setNoResults] = useState("");

  const dispatch = useDispatch();
  const recentWords = useSelector((state) => state.words.recentWords);
  const [showMoreRecent, setShowMoreRecent] = useState(false);
  const selectWordHandler = (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  const displayRecentSearches = () => {
    if (recentWords.length > 0) {
      setDisplayState(DISPLAY_STATE.recent.state);
    } else {
      setDisplayState(DISPLAY_STATE.empty.state);
    }
  };

  const displaySuggestedWords = (suggestedWords) => {
    setSuggestedWords(suggestedWords);
    setDisplayState(DISPLAY_STATE.suggested.state);
  };

  const onNoResultsFound = (searched) => {
    setNoResults(searched);
    setDisplayState(DISPLAY_STATE.noResults.state);
  };

  const RemoveRecentWordBtn = ({ indexToRemove }) => {
    if (displayState === DISPLAY_STATE.recent.state) {
      return (
        <Ionicons
          name={"ios-close"}
          size={25}
          style={styles.icon}
          color={Colors.iconGray}
          onPress={() => {
            dispatch(removeRecentWord(indexToRemove));
            displayRecentSearches();
          }}
        />
      );
    }
    return null;
  };

  const ShowMoreRecentWordsBtn = () => {
    if (
      displayState === DISPLAY_STATE.recent.state &&
      recentWords.length > 10
    ) {
      return (
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => setShowMoreRecent(!showMoreRecent)}
        >
          <CustomText style={styles.showMoreRecentWordsBtn} option='body'>
            {!showMoreRecent ? "Show More" : "Show Less"}
          </CustomText>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const ClearRecentWordsBtn = () => {
    if (displayState === DISPLAY_STATE.recent.state && recentWords.length > 0) {
      return (
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            dispatch(clearAllRecentWords());
            setDisplayState(DISPLAY_STATE.empty.state);
          }}
        >
          <CustomText style={styles.clearSearchesBtn} option='thin'>
            Clear Recent Words
          </CustomText>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const MainContent = () => {
    if (displayState === DISPLAY_STATE.empty.state) {
      // No Recent Searches to Display
      return (
        <View style={styles.centerContent}>
          <CustomText option='subLargeGray'>
            {DISPLAY_STATE.empty.msg}
          </CustomText>
        </View>
      );
    } else if (displayState === DISPLAY_STATE.noResults.state) {
      // No Results Found on Search
      return (
        <Fragment>
          <CustomText style={styles.listHeader} option='midThin'>
            {DISPLAY_STATE.noResults.msg}
          </CustomText>
          <CustomText option='subLarge'>{noResults}</CustomText>
        </Fragment>
      );
    } else if (
      displayState === DISPLAY_STATE.recent.state ||
      displayState === DISPLAY_STATE.suggested.state
    ) {
      // Display List of Recent Searches or Suggested Searches
      const data =
        displayState === DISPLAY_STATE.recent.state
          ? showMoreRecent
            ? recentWords
            : recentWords.slice(0, 10)
          : suggestedWords;

      return (
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item}
          ListHeaderComponent={() => (
            <CustomText style={styles.listHeader} option='midThin'>
              {DISPLAY_STATE[displayState].msg}
            </CustomText>
          )}
          renderItem={({ item, index }) => (
            <View style={styles.listWordContainer}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  selectWordHandler(item);
                }}
              >
                <CustomText option='subLarge'>{item}</CustomText>
              </TouchableOpacity>
              <RemoveRecentWordBtn indexToRemove={index} />
            </View>
          )}
          ListFooterComponent={() => (
            <Fragment>
              <ShowMoreRecentWordsBtn />
              <ClearRecentWordsBtn />
            </Fragment>
          )}
        ></FlatList>
      );
    } else {
      return <CustomText>LOADING...</CustomText>;
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          selectWordHandler={selectWordHandler}
          displayRecentSearches={displayRecentSearches}
          displaySuggestedWords={displaySuggestedWords}
          onNoResultsFound={onNoResultsFound}
        />
      </View>
      <MainContent />
    </View>
  );
};

SearchScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: "row",
  },
  icon: {
    paddingHorizontal: 4,
  },
  searchBarContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContent: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    paddingTop: 150,
  },
  list: {
    width: "100%",
    flex: 1,
  },
  listHeader: {
    marginVertical: 30,
  },
  listWordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  showMoreRecentWordsBtn: {
    marginTop: 15,
    color: Colors.primaryTheme,
  },
  clearSearchesBtn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.secondaryText,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 35,
  },
});

export default SearchScreen;
