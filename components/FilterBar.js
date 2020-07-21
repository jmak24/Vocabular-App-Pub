import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const FilterBar = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);

  const handleSetSearchInput = (event) => {
    let value = event.nativeEvent.text;
    value = value.replace(/[^-A-Za-z ]/gi, "");
    setSearchInput(value);

    // if (value === "") {displayRecentSearches();}
  };

  const handleClearSearchInput = () => {
    searchInputRef.current.clear();
    setSearchInput("");

    // displayRecentSearches();
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
        onChange={handleSetSearchInput}
        value={searchInput}
        ref={searchInputRef}
        returnKeyType={"search"}
      />
      {clearTextInputBtn}
    </View>
  );
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
