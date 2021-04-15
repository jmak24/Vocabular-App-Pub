import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import OptionButton from "../components/OptionButton";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";
import {
  clearBookmarkedWords,
  clearArchivedWords,
} from "../store/actions/words";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const SettingsScreen = ({ navigation }) => {
  const { userProfile: authedUser } = useSelector((state) => state);

  const selectMyProfile = () => {
    if (authedUser) {
      navigation.push("Profile");
    } else {
      navigation.push("Login");
    }
  };

  const clearBookmarksConfirmation = () =>
    Alert.alert("Are you sure you want to clear all Bookmarked words?", "", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => clearBookmarkedWords() },
    ]);

  const clearArchiveConfirmation = () =>
    Alert.alert("Are you sure you want to clear all Archived words?", "", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => clearArchivedWords() },
    ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
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
          <OptionButton
            icon={"ios-bookmark-outline"}
            title={"Clear Bookmarked Words"}
            onPress={clearBookmarksConfirmation}
          />
          <OptionButton
            icon={"ios-archive-outline"}
            title={"Clear Archived Words"}
            onPress={clearArchiveConfirmation}
          />
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
    </SafeAreaView>
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grayTint,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Sizing.topNavBarHeight,
  },
  scrollView: {
    width: "100%",
  },
  optionTitle: {
    marginBottom: 16,
    marginTop: 10,
  },
});

export default SettingsScreen;
