import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";

const FilterBar = ({
  handleFilterSearch,
  clearWordsList,
  isFilterMode,
  toggleFilterMode,
  forwardRefCancelFilter,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    forwardRefCancelFilter(handleCancelFilter);
  }, []);

  const handleSetFilterInput = (event) => {
    let value = event.nativeEvent.text;
    value = value.replace(/[^-A-Za-z ]/gi, "");
    setSearchInput(value);

    if (value === "") {
      clearWordsList();
    } else {
      handleFilterSearch(value.toLowerCase());
    }
  };

  const handleClearFilterInput = () => {
    searchInputRef.current.clear();
    setSearchInput("");

    clearWordsList();
  };

  const handleCancelFilter = () => {
    if (searchInputRef.current) {
      searchInputRef.current.clear();
      searchInputRef.current.blur();
      setSearchInput("");
    }
  };

  const clearTextInputBtn = searchInput !== "" && (
    <Ionicons
      name={"ios-close"}
      size={25}
      style={styles.icon}
      color={Colors.secondaryText}
      onPress={handleClearFilterInput}
    />
  );

  return (
    <View style={styles.FilterBar}>
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
        onChange={handleSetFilterInput}
        value={searchInput}
        ref={searchInputRef}
        returnKeyType={"search"}
        onFocus={() => {
          if (!isFilterMode) {
            toggleFilterMode();
          }
        }}
      />
      {clearTextInputBtn}
    </View>
  );
};

FilterBar.propTypes = {
  handleFilterSearch: PropTypes.func.isRequired,
  toggleFilterMode: PropTypes.func.isRequired,
  clearWordsList: PropTypes.func.isRequired,
  forwardRefCancelFilter: PropTypes.func.isRequired,
  isFilterMode: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  FilterBar: {
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

export default FilterBar;
