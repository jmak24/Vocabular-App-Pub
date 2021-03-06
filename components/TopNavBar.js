import React, { Fragment } from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const TopNavBar = ({ title, navigation }) => {
  return (
    <Fragment>
      <View
        style={{
          ...styles.topStrip,
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons
            name={"ios-arrow-back"}
            size={32}
            style={{ ...styles.backArrow }}
            color={Colors.iconGray}
          />
        </TouchableWithoutFeedback>
        <CustomText option='mid'>{title}</CustomText>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.grayTint,
    zIndex: 200,
    paddingTop: 4,
    paddingBottom: 15,
  },
  backArrow: {
    position: "absolute",
    left: 20,
    width: 25,
  },
});

export default TopNavBar;
