import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import WordDetailsScreen from "../screens/WordDetailsScreen";
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.grayTint,
  },
  headerTitleStyle: {
    fontFamily: "poppins-medium",
  },
  headerBackTitleStyle: {
    fontFamily: "poppins-reg",
  },
};

const WordDetailsNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    WordDetails: WordDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default createAppContainer(WordDetailsNavigator);
