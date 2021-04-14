import React, { useState, Fragment } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import CustomText from "./CustomText";
import PhraseCard from "./PhraseCard";
import PhraseModal from "./PhraseModal";
import Loading from "./Loading";
import Colors from "../constants/Colors";
import { objIsNotEmpty } from "../utils/helper";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const HeaderHeight = 131;
const NavBarHeight = 60;

const PhraseList = ({ navigation, forwardRef, scrollY, routeIndex, word }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    phrases: phraseData,
    loading: { FETCH_PHRASES },
    userProfile,
  } = useSelector((state) => state);
  const { myPhrases, topPhrases, recentPhrases } = phraseData;
  console.log(myPhrases);
  const addPhrasePressed = () => {
    if (userProfile) {
      toggleModal();
    } else {
      navigation.push("Login");
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Fragment>
      <Animated.ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps='handled'
        style={styles.scrollView}
        scrollIndicatorInsets={{ right: 1 }}
        keyExtractor={(item, index) => index}
        ref={(ref) => forwardRef(routeIndex, ref)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      >
        <Fragment>
          <PhraseModal
            toggleModal={toggleModal}
            modalVisible={modalVisible}
            word={word}
          />
          <View style={styles.phraseCategoryBar}>
            <CustomText option='mid'>My Phrases</CustomText>
          </View>
          <TouchableOpacity onPress={addPhrasePressed}>
            <View style={styles.addPhraseCard}>
              <Ionicons
                name={"ios-add"}
                size={34}
                style={styles.addIcon}
                color={Colors.iconLightGray}
              />
              <CustomText option='body'>Add Phrase</CustomText>
            </View>
          </TouchableOpacity>
          {FETCH_PHRASES.loading ? (
            <Loading />
          ) : (
            <Fragment>
              {objIsNotEmpty(myPhrases) && (
                <Fragment>
                  {Object.keys(myPhrases).map((key, index) => {
                    index++;
                    const phraseDetails = myPhrases[key];
                    return (
                      <PhraseCard
                        key={("My Phrases", index)}
                        details={phraseDetails}
                        myPhraseSection={true}
                        authedUserId={userProfile.id}
                      />
                    );
                  })}
                </Fragment>
              )}
              {objIsNotEmpty(topPhrases) && (
                <Fragment>
                  <View style={styles.phraseCategoryBar}>
                    <CustomText option='mid'>Top</CustomText>
                  </View>
                  {Object.keys(topPhrases).map((key, index) => {
                    index++;
                    const phraseDetails = topPhrases[key];
                    return (
                      <PhraseCard
                        key={("Top Phrases", index)}
                        details={phraseDetails}
                        myPhraseSection={false}
                        authedUser={userProfile}
                      />
                    );
                  })}
                </Fragment>
              )}
              {objIsNotEmpty(recentPhrases) && (
                <Fragment>
                  <View style={styles.phraseCategoryBar}>
                    <CustomText option='mid'>Recent</CustomText>
                  </View>
                  {Object.keys(recentPhrases).map((key, index) => {
                    index++;
                    const phraseDetails = recentPhrases[key];
                    return (
                      <PhraseCard
                        key={("Recent Phrases", index)}
                        details={phraseDetails}
                        myPhraseSection={false}
                        authedUser={userProfile}
                      />
                    );
                  })}
                </Fragment>
              )}
              <View style={{ height: 10 + HeaderHeight + NavBarHeight }} />
            </Fragment>
          )}
        </Fragment>
      </Animated.ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    paddingTop: 10 + HeaderHeight + NavBarHeight,
    paddingHorizontal: 20,
    backgroundColor: Colors.grayTint,
  },
  phraseCategoryBar: {
    width: "100%",
    alignItems: "flex-start",
    paddingBottom: 10,
    backgroundColor: Colors.grayTint,
  },
  addPhraseCard: {
    width: "100%",
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 16,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.background,
  },
  addIcon: {
    marginRight: 12,
  },
});

export default PhraseList;
