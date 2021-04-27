import React from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import TopNavBar from "../components/TopNavBar";
import Sizing from "../constants/Sizing";

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <TopNavBar navigation={navigation} title={"About"} />
        <ScrollView style={styles.scrollView}>
          <CustomText style={styles.sectionTitle} option='subLarge'>
            What is Vocabular?
          </CustomText>
          <CustomText option='body'>
            Vocabular offers a clean and uncluttered interface that allows you
            to simply lookup, add, and archive words on your phone. No ads, no
            promotions, only the words you want to learn.
          </CustomText>
          <CustomText style={styles.sectionTitle} option='subLarge'>
            Bookmark
          </CustomText>
          <CustomText option='body'>
            Bookmarking a word will add it to your home screen and save it to
            your device (making it accessible offline). This gives you the
            ability to revisit words that you're familiarizing or learning.
          </CustomText>
          <CustomText style={styles.sectionTitle} option='subLarge'>
            Archive
          </CustomText>
          <CustomText option='body'>
            When a bookmarked word is no longer of interest to you, you can have
            it moved into the archive section. Words that have been archived
            will be retrievable based on the year / month of when it was
            archived.
          </CustomText>
          <CustomText style={styles.sectionTitle} option='subLarge'>
            Phrases
          </CustomText>
          <CustomText option='body'>
            Phrases are sentences containing a particular word. Phrases should
            provide you with better context of how a word is used in a sentence.
            Create and view phrases for words you are learning to better master
            your understanding of a word. You can make your phrases public or
            private.
          </CustomText>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

AboutScreen.propTypes = {
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
  },
  sectionTitle: {
    marginBottom: 6,
    marginTop: 19,
  },
});

export default AboutScreen;
