import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const DynamicText = (props) => {
  const [currentFontSize, setCurrentFontSize] = useState(props.fontSize);
  return (
    <Text
      {...props}
      style={{ ...props.style, ...styles.regular, fontSize: currentFontSize }}
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > 1) {
          setCurrentFontSize(currentFontSize - 1);
        }
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: "poppins-reg",
    color: Colors.primaryText,
  },
});

export default DynamicText;
