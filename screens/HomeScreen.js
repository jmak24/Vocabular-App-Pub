import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Button,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "../components/CustomText";
import { addWord, removeWord, toggleBookmark } from "../store/actions/words";
import Colors from "../constants/Colors";

const panther = { word: "panther", result: [] };

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wordsList = useSelector((state) => state.words.wordsList);

  const openSearchHandler = () => {
    navigation.navigate("Search");
  };

  const selectWordHandler = (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBarContainer}>
        <TouchableWithoutFeedback onPress={openSearchHandler}>
          <View style={styles.searchBar}>
            <Ionicons
              name={"ios-search"}
              size={25}
              style={styles.icon}
              color={Colors.secondaryText}
            />
            <CustomText style={styles.searchText} option='midGray'>
              Search
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <SectionList
        sections={wordsList}
        style={styles.list}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section }) => {
          const textOption =
            section.title === "Main Words" ? "large" : "subLarge";

          return (
            <TouchableOpacity
              style={styles.listWord}
              onPress={() => selectWordHandler(item)}
            >
              <CustomText option={textOption}>{item}</CustomText>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) => {
          if (title === "Archived Words") {
            return <View style={styles.listSeparator} />;
          }
        }}
      />
      <Button
        style={styles.button}
        title='TOGGLE FAVORITE'
        onPress={() => dispatch(toggleBookmark(panther, false))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  topBarContainer: {
    flexDirection: "row",
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: Colors.grayTint,
  },
  icon: {
    paddingHorizontal: 4,
  },
  searchText: {
    marginLeft: 8,
  },
  list: {
    width: "100%",
    paddingTop: 20,
  },
  listWord: {
    paddingVertical: 8,
  },
  listSeparator: {
    height: 2,
    marginRight: 50,
    marginVertical: 30,
    backgroundColor: Colors.grayTint,
  },
  button: {
    backgroundColor: "#000",
    marginBottom: 100,
  },
});

export default HomeScreen;
