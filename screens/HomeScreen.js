import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import BookmarkImage from "../assets/bookmark-img.png";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const { wordsBookmarked } = useSelector((state) => state.words);

  const selectWordHandler = (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  const onPressSettings = () => {
    navigation.push("Settings");
  };

  const onPressLogin = () => {
    navigation.push("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.topBarContainer}>
          <TouchableWithoutFeedback onPress={onPressSettings}>
            <Ionicons
              name={"ios-settings-sharp"}
              size={32}
              color={Colors.iconGray}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressLogin}>
            <Ionicons
              name={"ios-person-outline"}
              size={32}
              color={Colors.iconGray}
            />
          </TouchableWithoutFeedback>
        </View>
        {wordsBookmarked && wordsBookmarked.length > 0 ? (
          <FlatList
            data={wordsBookmarked}
            style={styles.list}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.listWord}
                  onPress={() => selectWordHandler(item)}
                >
                  <CustomText option={"subLarge"}>{item}</CustomText>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.centerContent}>
            <Image style={styles.booksImage} source={BookmarkImage} />
            <CustomText style={{ textAlign: "center" }} option='subLargeGray'>
              Start Bookmarking{"\n"}Words!
            </CustomText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screen: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  booksImage: {
    width: 90,
    height: 90,
    right: 8,
    marginBottom: 40,
  },
  searchText: {
    marginLeft: 8,
  },
  list: {
    width: "100%",
    paddingTop: 20,
  },
  listWord: {
    paddingVertical: 8,
  },
  listSeparator: {
    height: 2,
    marginRight: 50,
    marginVertical: 30,
    backgroundColor: Colors.grayTint,
  },
});

export default HomeScreen;
