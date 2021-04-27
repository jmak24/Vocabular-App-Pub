import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import OptionButton from "../components/OptionButton";
import {
  handleSignOut,
  handleLoadUserPhrases,
  cleanupUserPhrases,
} from "../store/actions/userProfile";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";
import Loading from "../components/Loading";
import BarChartGraph from "../components/BarChartGraph";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [
    wordsBookmarked,
    wordsArchivedList,
    userProfile,
    FETCH_PHRASES,
  ] = useSelector((state) => [
    state.words.wordsBookmarked,
    state.words.wordsArchivedList,
    state.userProfile,
    state.loading.FETCH_PHRASES,
  ]);

  const numBookmarkedWords = wordsBookmarked.length;
  const numArchivedWords = wordsArchivedList.length;
  const numPhrases =
    userProfile &&
    userProfile.phrases &&
    Object.keys(userProfile.phrases).length;
  const { userTag, email } = userProfile;

  useEffect(() => {
    dispatch(handleLoadUserPhrases({ userId: userProfile.id }));
    return () => {
      if (userProfile && userProfile.hasOwnProperty("id")) {
        dispatch(cleanupUserPhrases());
      }
    };
  }, []);

  const updateProfileScreen = ({ formType }) => {
    navigation.push("UpdateProfile", { formType });
  };

  const selectMyPhrases = () => {
    if (userProfile) {
      navigation.push("MyPhrases");
    } else {
      navigation.push("Login");
    }
  };

  const changeUsernameSelected = () => {
    updateProfileScreen({ formType: "changeUserTag" });
  };

  const changePasswordSelected = () => {
    updateProfileScreen({ formType: "changePassword" });
  };

  const signOutSelected = () => {
    dispatch(handleSignOut());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <TopNavBar navigation={navigation} title={"My Profile"} />
        {FETCH_PHRASES.loading ? (
          <Loading />
        ) : (
          <ScrollView style={styles.scrollView}>
            <View style={styles.profileCard}>
              <CustomText
                option='subLarge'
                style={{ color: Colors.primaryTheme }}
              >
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
                  <CustomText option='subLarge'>
                    {numBookmarkedWords}
                  </CustomText>
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
                <View style={styles.stat}>
                  <Ionicons
                    name={"ios-chatbubble-ellipses-outline"}
                    size={26}
                    style={{ ...styles.icon, paddingRight: 10 }}
                    color={"#496a80"}
                  />
                  <CustomText option='subLarge'>{numPhrases}</CustomText>
                </View>
              </View>
              <BarChartGraph />
            </View>
            <CustomText style={styles.optionTitle} option='mid'>
              Account
            </CustomText>
            <OptionButton
              icon={"ios-chatbubble-ellipses-outline"}
              title={"View My Phrases"}
              onPress={selectMyPhrases}
            />
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
              title={"Sign out"}
              onPress={signOutSelected}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

ProfileScreen.propTypes = {
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
    paddingTop: Sizing.topNavBarHeight,
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
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
