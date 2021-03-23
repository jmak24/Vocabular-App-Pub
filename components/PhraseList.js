import React, { useState, useRef, useEffect, Fragment } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import CustomText from "./CustomText";
import PhraseCard from "./PhraseCard";
import PhraseModal from "./PhraseModal";
import Colors from "../constants/Colors";
import { setPhraseData } from "../store/actions/phrases";
import { PHRASE_DATA } from "../models/dummy-data"; // pull from AWS DB

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const HeaderHeight = 131;
const NavBarHeight = 60;

const PhraseList = ({ forwardRef, scrollY, routeIndex, word }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const phraseData = useSelector((state) => state.phrases);
  // const authedUser = useSelector((state) => state.authedUser); get authedUser
  const authedUser = "jmak";

  useEffect(() => {
    dispatch(setPhraseData(PHRASE_DATA)); // will call api to pull phrase data
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const isLoading =
    phraseData === undefined ||
    (phraseData && !phraseData.hasOwnProperty("myPhrases"));

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
          <TouchableOpacity onPress={toggleModal}>
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
          {isLoading ? (
            <CustomText option='large'>LOADING...</CustomText>
          ) : (
            <Fragment>
              {Object.keys(phraseData.myPhrases).map((key, index) => {
                index++;
                const item = phraseData.myPhrases[key];
                return (
                  <PhraseCard
                    key={("My Phrases", index)}
                    details={item}
                    myPhraseSection={true}
                    authedUser={authedUser}
                  />
                );
              })}
              <View style={styles.phraseCategoryBar}>
                <CustomText option='mid'>Top Phrases</CustomText>
              </View>
              {Object.keys(phraseData.topPhrases).map((key, index) => {
                index++;
                const item = phraseData.topPhrases[key];
                return (
                  <PhraseCard
                    key={("Top Phrases", index)}
                    details={item}
                    myPhraseSection={false}
                    authedUser={authedUser}
                  />
                );
              })}
              <View style={styles.phraseCategoryBar}>
                <CustomText option='mid'>Recent Phrases</CustomText>
              </View>
              {Object.keys(phraseData.recentPhrases).map((key, index) => {
                index++;
                const item = phraseData.recentPhrases[key];
                return (
                  <PhraseCard
                    key={("Recent Phrases", index)}
                    details={item}
                    myPhraseSection={false}
                    authedUser={authedUser}
                  />
                );
              })}
              <View style={{ height: 10 + HeaderHeight + NavBarHeight }} />
            </Fragment>
          )}
        </Fragment>
      </Animated.ScrollView>
    </Fragment>
  );
};

// PhraseList.propTypes = {
//   phraseData: PropTypes.object.isRequired,
// };

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
