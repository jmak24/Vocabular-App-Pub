import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import PropTypes from "prop-types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DefinitionSectionList from "./DefinitionSectionList";
import Colors from "../constants/Colors";

const Tab = createMaterialTopTabNavigator();

const WordDetailsTabBar = ({
  wordDetails,
  selectWordHandler,
  // isBookmarked,
  // isArchived,
  // animatedScroll,
}) => {
  return (
    <Tab.Navigator
      initialRouteName='Definitions'
      tabBarOptions={{
        activeTintColor: Colors.primaryText,
        labelStyle: { fontSize: 14 },
        style: { backgroundColor: Colors.grayTint },
      }}
    >
      <Tab.Screen
        name='Definitions'
        options={{ tabBarLabel: "Definitions" }}
        children={() => (
          <DefinitionSectionList
            wordDetails={wordDetails}
            selectWordHandler={selectWordHandler}
            // animatedScroll={animatedScroll}
            // isBookmarked={isBookmarked}
            // isArchived={isArchived}
          />
        )}
      ></Tab.Screen>
      <Tab.Screen
        name='Phrases'
        children={() => <View />}
        options={{ tabBarLabel: "Phrases" }}
      />
    </Tab.Navigator>
  );
};

DefinitionSectionList.propTypes = {
  wordDetails: PropTypes.object.isRequired,
  selectWordHandler: PropTypes.func.isRequired,
  animatedScroll: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

const styles = StyleSheet.create({});

export default WordDetailsTabBar;
