import React, { Fragment, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CustomText from "./CustomText";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const activatedOffsetY = 100;
const inactiveOffsetY = -200;

const Toast = () => {
  const toasts = useSelector((state) => state.toasts);
  const animatedToasts = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    for (let i = 0; i < toasts.length; i++) {
      switch (toasts[i].state) {
        case "active-slide-up":
          toggleToast(animatedToasts[i], true);
          break;
        case "inactive-slide-down":
          toggleToast(animatedToasts[i], false);
          break;
        default:
          deactivateToast(animatedToasts[i]);
          break;
      }
    }
  }, [toasts]);

  const toggleToast = (animatedToast, activated) => {
    const finalValue = activated ? activatedOffsetY : inactiveOffsetY;
    Animated.spring(animatedToast, {
      toValue: finalValue,
      bounciness: 3,
      useNativeDriver: false,
    }).start();
  };

  const deactivateToast = (animatedToast) => {
    animatedToast.setValue(inactiveOffsetY);
  };

  return (
    // Two Toast Views
    <Fragment>
      {toasts.map((toast, index) => (
        <Animated.View
          key={("Toast", index)}
          style={[
            {
              bottom: animatedToasts[index],
              opacity: animatedToasts[index].interpolate({
                inputRange: [inactiveOffsetY, activatedOffsetY],
                outputRange: [0, 1],
              }),
              backgroundColor: Colors[toast.toastType],
              ...styles.toastContainer,
            },
          ]}
        >
          {toast.icon && (
            <Ionicons
              name={toast.icon}
              size={32}
              style={styles.icon}
              color='#FFFFFF'
            />
          )}
          <View style={styles.textContainer}>
            <CustomText option='toast' style={styles.text}>
              {toast.msg}
            </CustomText>
          </View>
        </Animated.View>
      ))}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    right: 20,
    paddingHorizontal: 30,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    borderRadius: 5,
  },
  icon: {
    marginRight: 30,
  },
  textContainer: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Toast;
