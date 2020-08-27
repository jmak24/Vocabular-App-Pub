import React, { Fragment } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "./CustomText";
import DefinitionCard from "./DefinitionCard";
import Colors from "../constants/Colors";
import { SPEECH_TYPES } from "../constants/OrderedItems";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const DefinitionsList = ({ wordDetails, selectWordHandler }) => {
  return (
    <Fragment>
      {SPEECH_TYPES.map((speechType) => {
        if (wordDetails.results.hasOwnProperty(speechType)) {
          return (
            <Fragment>
              <View style={styles.speechCategoryBar}>
                <CustomText option='mid'>{speechType}</CustomText>
                <Ionicons
                  name={"ios-arrow-up"}
                  size={22}
                  style={styles.icon}
                  color={Colors.secondaryText}
                />
              </View>
              {wordDetails.results[speechType].map((item, index) => {
                index++;
                const uniqueId = speechType + "-" + index;
                return (
                  <DefinitionCard
                    details={item}
                    selectWordHandler={selectWordHandler}
                    key={uniqueId}
                    uniqueId={uniqueId}
                    index={index}
                  />
                );
              })}
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
};

DefinitionsList.propTypes = {
  wordDetails: PropTypes.object.isRequired,
  selectWordHandler: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  speechCategoryBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 8,
  },
});

export default DefinitionsList;
