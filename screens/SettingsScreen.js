import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import OptionButton from "../components/OptionButton";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const SettingsScreen = ({ route, navigation }) => {
  const selectMyProfile = async () => {
    navigation.push("Profile", {});
  };

  const clearBookmarksConfirmation = () =>
    Alert.alert("Are you sure you want to clear all Bookmarked words?", "", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => console.log("IMPLEMENT ACTION") },
    ]);

  const clearArchiveConfirmation = () =>
    Alert.alert("Are you sure you want to clear all Archived words?", "", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => console.log("IMPLEMENT ACTION") },
    ]);

  return (
    <View style={{ ...styles.screen, paddingTop: Sizing.topNavBarHeight }}>
      <TopNavBar navigation={navigation} title={"Settings"} />
      <ScrollView style={styles.scrollView}>
        <CustomText style={styles.optionTitle} option='mid'>
          App
        </CustomText>
        <OptionButton
          icon={"ios-person-outline"}
          title={"My Profile"}
          onPress={selectMyProfile}
        />
        {/* <OptionButton
          icon={"ios-bookmark-outline"}
          title={"Clear Bookmarked Words"}
          onPress={clearBookmarksConfirmation}
        />
        <OptionButton
          icon={"ios-archive-outline"}
          title={"Clear Archived Words"}
          onPress={clearArchiveConfirmation}
        /> */}
        <CustomText style={styles.optionTitle} option='mid'>
          Support Us
        </CustomText>
        <OptionButton icon={"ios-share-outline"} title={"Share Vocabular"} />
        <OptionButton icon={"ios-star-outline"} title={"Leave us a Review"} />
        <CustomText style={styles.optionTitle} option='mid'>
          Help
        </CustomText>
        <OptionButton
          icon={"ios-chatbox-ellipses-outline"}
          title={"Give us Feedback"}
        />
        <OptionButton icon={"ios-help-circle-outline"} title={"Help"} />
      </ScrollView>
    </View>
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: Colors.grayTint,
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  optionTitle: {
    marginBottom: 16,
    marginTop: 10,
  },
});

export default SettingsScreen;
