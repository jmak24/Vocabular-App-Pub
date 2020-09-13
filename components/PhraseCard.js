import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import CustomText from "./CustomText";

const PhraseCard = ({ details }) => {
  const { phrase, likes, isVisible } = details;

  return (
    <View style={styles.phraseCard}>
      <CustomText option='body'>"{phrase}"</CustomText>
      <View style={styles.bottomSection}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name={"ios-share-alt"}
            size={30}
            style={styles.icon}
            color={Colors.iconLightGray}
          />
          {isVisible ? (
            <Ionicons
              name={"ios-eye"}
              size={30}
              style={styles.icon}
              color={Colors.iconLightGray}
            />
          ) : (
            <Ionicons
              name={"ios-eye-off"}
              size={30}
              style={styles.icon}
              color={Colors.iconLightGray}
            />
          )}
          <Ionicons
            name={"ios-trash"}
            size={30}
            style={styles.icon}
            color={Colors.iconLightGray}
          />
        </View>
      </View>
    </View>
  );
};

PhraseCard.propTypes = {
  details: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  phraseCard: {
    width: "100%",
    borderRadius: 15,
    padding: 13,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
  bottomSection: {
    width: "100%",
    paddingTop: 30,
    justifyContent: "space-between",
  },
  icon: {
    paddingRight: 23,
  },
});

export default PhraseCard;
