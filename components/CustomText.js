import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const CustomText = (props) => {
  let option = styles.bodyText;
  if (props.option) {
    option = props.option;
  }
  return (
    <Text {...props} style={{ ...styles[option], ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontFamily: "poppins-reg",
    color: Colors.primaryText,
  },
  bodyGray: {
    fontSize: 16,
    fontFamily: "poppins-reg",
    color: Colors.secondaryText,
  },
  mid: {
    fontSize: 19,
    fontFamily: "poppins-reg",
    color: Colors.primaryText,
  },
  midGray: {
    fontSize: 19,
    fontFamily: "poppins-reg",
    color: Colors.secondaryText,
  },
  thin: {
    fontSize: 16,
    fontFamily: "poppins-light",
    color: Colors.secondaryText,
  },
  midThin: {
    fontSize: 19,
    fontFamily: "poppins-light",
    color: Colors.secondaryText,
  },
  large: {
    fontSize: 34,
    fontFamily: "poppins-medium",
    color: Colors.primaryText,
  },
  subLarge: {
    fontSize: 24,
    fontFamily: "poppins-medium",
    color: Colors.primaryText,
  },
  subLargeGray: {
    fontSize: 24,
    fontFamily: "poppins-medium",
    color: Colors.secondaryText,
  },
  relatedTypeTitle: {
    fontSize: 14,
    fontFamily: "poppins-semibold",
  },
  toast: {
    fontSize: 16,
    fontFamily: "poppins-medium",
    color: "#fff",
  },
});

export default CustomText;
