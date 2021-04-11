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
import { handleLogOut } from "../store/actions/userProfile";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const ProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userProfile, words } = useSelector((state) => state);
  const numBookmarkedWords = words.wordsList.length;
  const numArchivedWords = words.archivedWordsList.length;
  const { userTag, email } = userProfile;

  const updateProfileScreen = async ({ formType }) => {
    navigation.push("UpdateProfile", { formType });
  };

  const changeUsernameSelected = () => {
    updateProfileScreen({ formType: "changeUserTag" });
  };

  const changePasswordSelected = () => {
    updateProfileScreen({ formType: "changePassword" });
  };

  const logOutSelected = () => {
    dispatch(handleLogOut());
    navigation.goBack();
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
      <TopNavBar navigation={navigation} title={"My Profile"} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <CustomText option='subLarge' style={{ color: Colors.primaryTheme }}>
            {userTag}
          </CustomText>
          <CustomText option='bodyGray'>{email}</CustomText>
          <View style={styles.profileStats}>
            <View style={styles.stat}>
              <Ionicons
                name={"ios-bookmark-outline"}
                size={26}
                style={{ ...styles.icon, paddingRight: 10 }}
                color={"#496a80"}
              />
              <CustomText option='subLarge'>{numBookmarkedWords}</CustomText>
            </View>
            <View style={styles.stat}>
              <Ionicons
                name={"ios-archive-outline"}
                size={26}
                style={{ ...styles.icon, paddingRight: 10 }}
                color={"#496a80"}
              />
              <CustomText option='subLarge'>{numArchivedWords}</CustomText>
            </View>
          </View>
        </View>
        <CustomText style={styles.optionTitle} option='mid'>
          Data
        </CustomText>
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
        <OptionButton
          icon={"ios-chatbubble-ellipses-outline"}
          title={"Delete Phrases"}
          onPress={() => {}}
        />
        <CustomText style={styles.optionTitle} option='mid'>
          Account
        </CustomText>
        <OptionButton
          icon={"ios-at"}
          title={"Change Username"}
          onPress={changeUsernameSelected}
        />
        <OptionButton
          icon={"ios-lock-closed-outline"}
          title={"Change Password"}
          onPress={changePasswordSelected}
        />
        <OptionButton
          icon={"ios-log-out-outline"}
          title={"Log out"}
          onPress={logOutSelected}
        />
      </ScrollView>
    </View>
  );
};

ProfileScreen.propTypes = {
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
  profileCard: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
  profileStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 35,
  },
  optionTitle: {
    marginBottom: 16,
    marginTop: 10,
  },
});

export default ProfileScreen;
