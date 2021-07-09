import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import PhraseCard from "../components/PhraseCard";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";
import MessagePage from "../components/MessagePage";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const MyPhrasesScreen = ({ navigation }) => {
  const userProfile = useSelector((state) => state.userProfile);
  const phraseData = userProfile && userProfile.phrases;

  const selectWordHandler = (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <TopNavBar navigation={navigation} title={"My Phrases"} />
        {phraseData && Object.keys(phraseData).length > 0 ? (
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
                    <TouchableOpacity
                      onPress={() => selectWordHandler(phraseDetails.word)}
                    >
                      <CustomText style={styles.phraseWord} option='midGray'>
                        {phraseDetails.word}
                      </CustomText>
                    </TouchableOpacity>
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
        ) : (
          <MessagePage
            message={
              "You do not have any phrases right now. Start exploring words and creating your own phrases!"
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grayTint,
  },
  screen: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: Sizing.topNavBarHeight,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
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
