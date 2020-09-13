import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import RelatedItems from "../constants/RelatedItems";
import { RELATED_TYPES } from "../constants/OrderedItems";
import CustomText from "./CustomText";

const DefinitionRelatedItems = ({
  selectWordHandler,
  initContainerHeight,
  details,
  uniqueId,
}) => {
  return (
    <View
      style={styles.animatedContainer}
      onLayout={(e) => initContainerHeight(e)}
    >
      {RELATED_TYPES.map((relatedType) => {
        if (details.hasOwnProperty(relatedType)) {
          const { title, color } = RelatedItems[relatedType];
          return (
            <View key={(uniqueId, " ", relatedType)}>
              <CustomText
                style={{ color: color, ...styles.relatedItem }}
                option='relatedTypeTitle'
              >
                {title}
              </CustomText>
              <View style={styles.relatedItemsContainer}>
                {details[relatedType].map((relatedItem, index) => {
                  return (
                    <TouchableOpacity
                      key={(uniqueId, " ", relatedType, "-", index)}
                      onPress={() => selectWordHandler(relatedItem)}
                    >
                      <View
                        style={{ ...styles.relatedWord, ...styles.relatedItem }}
                      >
                        <CustomText option='body'>{relatedItem}</CustomText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

DefinitionRelatedItems.propTypes = {
  selectWordHandler: PropTypes.func.isRequired,
  initContainerHeight: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

const DefinitionCard = ({
  details,
  arrowCommand,
  updateExpandedCount,
  selectWordHandler,
  speechCategory,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerHeight = useRef(null);
  const animatedCard = useRef(new Animated.Value(0)).current;
  const uniqueId = speechCategory + "-" + index;

  useEffect(() => {
    const arrowCmd = arrowCommand.slice(0, -3); // remove (x,y) identifiers
    const speechCmd = arrowCmd.split("-")[0];
    const actionCmd = arrowCmd.split("-")[1];
    if (speechCmd === speechCategory && relatedItemsExist) {
      const toExpand = actionCmd === "expand" ? true : false;
      if (toExpand !== isExpanded) toggle(true);
    }
  }, [arrowCommand]);

  const toggle = (isMulti) => {
    const expandedHeight =
      containerHeight.current + styles.animatedContainer.top;
    const finalValue = isExpanded ? 0 : expandedHeight;

    Animated.spring(animatedCard, {
      toValue: finalValue,
      bounciness: 4,
      useNativeDriver: false,
    }).start();
    if (!isMulti) updateExpandedCount(!isExpanded, speechCategory);
    setIsExpanded(!isExpanded);
  };

  const initContainerHeight = (event) => {
    containerHeight.current = event.nativeEvent.layout.height;
  };

  const relatedItemsExist = RELATED_TYPES.reduce((result, type) => {
    if (result || details.hasOwnProperty(type)) return true;
    return false;
  }, false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (relatedItemsExist) toggle();
      }}
      activeOpacity={0.65}
    >
      <View style={styles.definitionCard}>
        <View style={{ flexDirection: "row" }}>
          <CustomText option='body'>{index}.</CustomText>
          <View style={styles.definitionText}>
            <CustomText option='body'>{details.definition}</CustomText>
            {details.examples &&
              details.examples.map((item, index) => (
                <CustomText key={(uniqueId, " ex-", index)} option='bodyGray'>
                  "{item}"
                </CustomText>
              ))}
          </View>
        </View>

        <Animated.View style={[{ height: animatedCard }]}>
          <DefinitionRelatedItems
            selectWordHandler={selectWordHandler}
            initContainerHeight={initContainerHeight}
            details={details}
            uniqueId={uniqueId}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

DefinitionCard.propTypes = {
  details: PropTypes.object.isRequired,
  arrowCommand: PropTypes.string.isRequired,
  updateExpandedCount: PropTypes.func.isRequired,
  selectWordHandler: PropTypes.func.isRequired,
  speechCategory: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  definitionCard: {
    width: "100%",
    borderRadius: 15,
    padding: 13,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
  definitionText: {
    paddingHorizontal: 10,
  },
  relatedItemsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  relatedWord: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: Colors.grayTint,
  },
  relatedItem: {
    marginVertical: 7,
  },
  animatedContainer: {
    position: "absolute",
    top: 15,
    left: 0,
    right: 0,
  },
});

export default DefinitionCard;
