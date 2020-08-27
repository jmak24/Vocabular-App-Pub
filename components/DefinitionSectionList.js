import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SectionList,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "./CustomText";
import DefinitionCard from "./DefinitionCard";
import Colors from "../constants/Colors";
import WordDetailsHeader from "../components/WordDetailsHeader";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const DefinitionSectionList = ({
  wordDetails,
  selectWordHandler,
  // isBookmarked,
  // isArchived,
  // animatedScroll,
}) => {
  const [cardsExpanded, setCardsExpanded] = useState({});
  const [arrowCommand, setArrowCommand] = useState("");
  const numItemsInSpeech = useRef(null);

  useEffect(() => {
    numItemsInSpeech.current = loadNumItemsInSpeech();
  }, []);

  const loadNumItemsInSpeech = () => {
    const numItemsInSpeech = {};
    for (let i = 0; i < wordDetails.results.length; i++) {
      const speech = wordDetails.results[i].title;
      const numItems = wordDetails.results[i].data.length;
      numItemsInSpeech[speech] = numItems;
    }
    return numItemsInSpeech;
  };

  const updateExpandedCount = (expanded, speechCategory, multiUpdate) => {
    if (multiUpdate) {
      if (expanded) multiUpdate = 0;
      setCardsExpanded({ ...cardsExpanded, [speechCategory]: multiUpdate });
    } else {
      if (cardsExpanded.hasOwnProperty(speechCategory)) {
        if (expanded) {
          setCardsExpanded({
            ...cardsExpanded,
            [speechCategory]: cardsExpanded[speechCategory] + 1,
          });
        } else {
          setCardsExpanded({
            ...cardsExpanded,
            [speechCategory]: cardsExpanded[speechCategory] - 1,
          });
        }
      } else {
        if (expanded) {
          setCardsExpanded({ ...cardsExpanded, [speechCategory]: 1 });
        } else {
          setCardsExpanded({ ...cardsExpanded, [speechCategory]: 0 });
        }
      }
    }
  };

  const onPressArrowIcon = (speechCategory) => {
    let command = speechCategory + "-";
    let expanded = cardsExpanded[speechCategory] > 0 ? true : false;
    if (cardsExpanded.hasOwnProperty(speechCategory)) {
      command += expanded ? "collapse" : "expand";
    } else {
      command += "expand";
    }

    // set unique state by appending (x,y) to trigger re-render
    const id = arrowCommand.includes("(y)") ? "(x)" : "(y)";
    setArrowCommand(command + id);
    updateExpandedCount(
      expanded,
      speechCategory,
      numItemsInSpeech.current[speechCategory]
    );
  };

  return (
    <SectionList
      sections={wordDetails.results}
      // onScroll={Animated.event(
      //   [
      //     {
      //       nativeEvent: { contentOffset: { y: animatedScroll } },
      //     },
      //   ],
      //   { useNativeDriver: false }
      // )}
      stickySectionHeadersEnabled={true}
      style={styles.sectionList}
      scrollIndicatorInsets={{ right: 1 }}
      keyExtractor={(item, index) => item.partOfSpeech + index}
      // ListHeaderComponent={() => {
      //   return (
      //     <WordDetailsHeader
      //       wordDetails={wordDetails}
      //       isBookmarked={isBookmarked}
      //       isArchived={isArchived}
      //       animatedScroll={animatedScroll}
      //     />
      //   );
      // }}
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

DefinitionSectionList.propTypes = {
  wordDetails: PropTypes.object.isRequired,
  selectWordHandler: PropTypes.func.isRequired,
  // isBookmarked: PropTypes.bool.isRequired,
  // isArchived: PropTypes.bool.isRequired,
  animatedScroll: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

const styles = StyleSheet.create({
  sectionList: {
    width: "100%",
    paddingTop: 25,
    backgroundColor: Colors.grayTint,
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
