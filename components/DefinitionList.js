import React, { useState, useRef, useEffect, Fragment } from "react";
import {
  View,
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

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const HeaderHeight = 131;
const NavBarHeight = 60;

const DefinitionList = ({
  wordDetails,
  selectWordHandler,
  forwardRef,
  scrollY,
  routeIndex,
}) => {
  const [cardsExpanded, setCardsExpanded] = useState({});
  const [arrowCommand, setArrowCommand] = useState("");
  const numItemsInSpeech = useRef(null);
  const listOffsetY = useRef({});

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
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={styles.scrollView}
      scrollIndicatorInsets={{ right: 1 }}
      keyExtractor={(item, index) => item.partOfSpeech + index}
      ref={(ref) => forwardRef(routeIndex, ref)}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        {
          useNativeDriver: false,
        }
      )}
    >
      {wordDetails.results.map((section) => {
        const title = section.title;
        const arrowIcon =
          cardsExpanded.hasOwnProperty(title) && cardsExpanded[title] > 0
            ? "ios-arrow-down"
            : "ios-arrow-up";
        return (
          <Fragment key={title}>
            <View style={styles.speechCategoryBar}>
              <CustomText option='mid'>{title}</CustomText>
              <TouchableWithoutFeedback onPress={() => onPressArrowIcon(title)}>
                <Ionicons
                  name={arrowIcon}
                  size={23}
                  style={styles.icon}
                  color={Colors.iconGray}
                />
              </TouchableWithoutFeedback>
            </View>
            {section.data.map((definitionDetails, index) => {
              index++;
              return (
                <DefinitionCard
                  key={(title, index)}
                  details={definitionDetails}
                  arrowCommand={arrowCommand}
                  updateExpandedCount={updateExpandedCount}
                  selectWordHandler={selectWordHandler}
                  speechCategory={definitionDetails.partOfSpeech}
                  index={index}
                />
              );
            })}
          </Fragment>
        );
      })}
      <View style={{ height: 10 + HeaderHeight + NavBarHeight }} />
    </Animated.ScrollView>
  );
};

DefinitionList.propTypes = {
  wordDetails: PropTypes.object.isRequired,
  selectWordHandler: PropTypes.func.isRequired,
  scrollY: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    paddingTop: 10 + HeaderHeight + NavBarHeight,
    paddingHorizontal: 20,
    backgroundColor: Colors.grayTint,
  },
  speechCategoryBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  icon: {
    marginHorizontal: 8,
  },
});

export default DefinitionList;
