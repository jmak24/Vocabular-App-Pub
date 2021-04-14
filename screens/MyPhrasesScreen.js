import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import PhraseCard from "../components/PhraseCard";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const MyPhrasesScreen = ({ navigation }) => {
  const { userProfile } = useSelector((state) => state);
  const phraseData = userProfile.phrases;

  return (
    <View style={{ ...styles.screen, paddingTop: Sizing.topNavBarHeight }}>
      <TopNavBar navigation={navigation} title={"My Phrases"} />
      <FlatList
        data={Object.keys(phraseData)}
        style={styles.list}
        keyExtractor={(key, index) => phraseData[key].word + index}
        renderItem={({ item: key }) => {
          const phraseDetails = phraseData[key];
          const dateCreated = new Date(phraseDetails.createdAt);
          return (
            <Fragment>
              <View style={styles.phraseInfo}>
                <CustomText style={styles.phraseWord} option='midGray'>
                  {phraseDetails.word}
                </CustomText>
                <CustomText option='body'>
                  {dateCreated.toLocaleDateString()}
                </CustomText>
              </View>
              <PhraseCard
                details={phraseDetails}
                myPhraseSection={true}
                authedUserId={userProfile.id}
              />
            </Fragment>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: Colors.grayTint,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  phraseInfo: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phraseWord: {
    textDecorationLine: "underline",
  },
});

export default MyPhrasesScreen;
