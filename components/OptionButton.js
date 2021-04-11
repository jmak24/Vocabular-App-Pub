import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";

const OptionButton = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.optionButton}>
        <Ionicons
          name={icon}
          size={25}
          color={Colors.iconGray}
          style={styles.optionIcon}
        />
        <CustomText option='mid'>{title}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
  optionIcon: {
    width: 45,
    marginHorizontal: 14,
  },
});

export default OptionButton;
