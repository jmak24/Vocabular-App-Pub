import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import { apiSuggestedWords } from "../utils/helper";

const SearchBar = ({
  displayRecentSearches,
  displaySuggestedWords,
  onNoResultsFound,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const handleSetSearchInput = (event) => {
    let value = event.nativeEvent.text;
    value = value.replace(/[^-A-Za-z ]/gi, "");
    setSearchInput(value);

    if (value === "") displayRecentSearches();
  };

  const handleClearSearchInput = () => {
    searchInputRef.current.clear();
    setSearchInput("");

    displayRecentSearches();
  };

  const handleSearch = async () => {
    try {
      if (searchInput.trim().length <= 0) {
        console.log("Invalid Search Input");
        return;
      }

      console.log("Searching... ", searchInput);

      const suggestedWords = await apiSuggestedWords(searchInput);
      if (suggestedWords.length > 0) {
        displaySuggestedWords(suggestedWords);
      } else {
        onNoResultsFound(searchInput);
      }
    } catch (err) {
      if (err) console.log(err);
      onNoResultsFound(searchInput);
    }
  };

  const clearTextInputBtn = searchInput !== "" && (
    <Ionicons
      name={"ios-close"}
      size={25}
      style={styles.icon}
      color={Colors.secondaryText}
      onPress={handleClearSearchInput}
    />
  );

  return (
    <View style={styles.searchBar}>
      <Ionicons
        name={"ios-search"}
        size={25}
        style={styles.icon}
        color={Colors.secondaryText}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Find Word'
        selectionColor={Colors.primaryTheme}
        onChange={handleSetSearchInput}
        value={searchInput}
        ref={searchInputRef}
        onSubmitEditing={handleSearch}
        returnKeyType={"search"}
      />
      {clearTextInputBtn}
    </View>
  );
};

SearchBar.propTypes = {
  displayRecentSearches: PropTypes.func.isRequired,
  displaySuggestedWords: PropTypes.func.isRequired,
  onNoResultsFound: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: Colors.grayTint,
  },
  icon: {
    paddingHorizontal: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "poppins-reg",
    color: Colors.primaryText,
    marginLeft: 8,
  },
});

export default SearchBar;
