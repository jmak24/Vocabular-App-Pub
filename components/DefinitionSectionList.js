import React, { useState, useRef } from "react";
import {
  View,
  SectionList,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "./CustomText";
import DefinitionCard from "./DefinitionCard";
import Colors from "../constants/Colors";
import DefinitionHeader from "../components/DefinitionHeader";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const DefinitionSectionList = ({
  wordDetails,
  selectWordHandler,
  animatedScroll,
  isBookmarked,
}) => {
  const cardsExpanded = useState({});
  const [arrowCommand, setArrowCommand] = useState("");

  const updateExpandedCount = (expanded, speechCategory) => {
    if (cardsExpanded.hasOwnProperty(speechCategory)) {
      if (expanded) {
        cardsExpanded[speechCategory] += 1;
      } else {
        cardsExpanded[speechCategory] -= 1;
      }
    } else {
      if (expanded) {
        cardsExpanded[speechCategory] = 1;
      } else {
        cardsExpanded[speechCategory] = 0;
      }
    }
    console.log(cardsExpanded);
  };

  const onPressArrowIcon = (speechCategory) => {
    let command = speechCategory + "-";
    if (cardsExpanded.hasOwnProperty(speechCategory)) {
      command += cardsExpanded[speechCategory] === 0 ? "expand" : "collapse";
    } else {
      command += "expand";
    }
    // generate unique state by appending (x,y) to trigger re-render
    const id = arrowCommand.includes("(y)") ? "(x)" : "(y)";
    setArrowCommand(command + id);
  };
  console.log("RE-RENDERED");
  return (
    <SectionList
      sections={wordDetails.results}
      onScroll={Animated.event([
        { nativeEvent: { contentOffset: { y: animatedScroll } } },
      ])}
      stickySectionHeadersEnabled={true}
      style={styles.sectionList}
      scrollIndicatorInsets={{ right: 1 }}
      keyExtractor={(item, index) => item.partOfSpeech + index}
      ListHeaderComponent={() => {
        return (
          <DefinitionHeader
            wordDetails={wordDetails}
            isBookmarked={isBookmarked}
            animatedScroll={animatedScroll}
          />
        );
      }}
      renderSectionHeader={({ section: { title } }) => {
        // cards collapsed
        let arrowIcon = (
          <Ionicons
            name={"ios-arrow-up"}
            size={22}
            style={styles.icon}
            color={Colors.secondaryText}
          />
        );
        if (cardsExpanded.hasOwnProperty(title) && cardsExpanded[title] > 0) {
          // cards expanded
          arrowIcon = (
            <Ionicons
              name={"ios-arrow-down"}
              size={22}
              style={styles.icon}
              color={Colors.secondaryText}
            />
          );
        }
        return (
          <View style={styles.speechCategoryBar}>
            <CustomText option='mid'>{title}</CustomText>
            <TouchableWithoutFeedback onPress={() => onPressArrowIcon(title)}>
              {arrowIcon}
            </TouchableWithoutFeedback>
          </View>
        );
      }}
      renderItem={({ item, index }) => {
        index++;
        return (
          <DefinitionCard
            details={item}
            arrowCommand={arrowCommand}
            updateExpandedCount={updateExpandedCount}
            selectWordHandler={selectWordHandler}
            speechCategory={item.partOfSpeech}
            index={index}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  sectionList: {
    width: "100%",
  },
  speechCategoryBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    backgroundColor: Colors.grayTint,
  },
  wordTitle: {
    textAlign: "left",
    fontSize: 40,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 32,
  },
  icon: {
    marginHorizontal: 8,
  },
});

export default DefinitionSectionList;
