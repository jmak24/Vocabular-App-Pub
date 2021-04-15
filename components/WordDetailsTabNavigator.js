import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DefinitionList from "./DefinitionList";
import PhraseList from "./PhraseList";
import Colors from "../constants/Colors";
import CustomText from "./CustomText";

const Tab = createMaterialTopTabNavigator();
const HeaderHeight = 131;

const TabBar = ({ state, descriptors, navigation, scrollY, expandHeader }) => {
  const animatedTabBarY = scrollY.interpolate({
    inputRange: [0, HeaderHeight],
    outputRange: [HeaderHeight, 0],
    extrapolate: "clamp",
  });
  const animateTabX = useRef(new Animated.Value(0)).current;
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;

  return (
    <Animated.View
      style={{
        ...styles.tabBar,
        transform: [{ translateY: animatedTabBarY }],
      }}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={{
            ...styles.activeTab,
            width: tabWidth,
            transform: [{ translateX: animateTabX }],
          }}
        />
      </View>

      {state.routes.map((route, routeIndex) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === routeIndex;

        const onTabPress = () => {
          expandHeader(routeIndex);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          Animated.spring(animateTabX, {
            toValue: routeIndex * tabWidth,
            velocity: 10,
            useNativeDriver: true,
          }).start();
        };

        return (
          <TouchableWithoutFeedback
            key={label}
            onPress={onTabPress}
            accessibilityRole='button'
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <View style={styles.tab}>
              <CustomText
                style={{ fontSize: 16 }}
                option={isFocused ? "body" : "bodyGray"}
              >
                {label.toUpperCase()}
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </Animated.View>
  );
};

const WordDetailsTabNavigator = ({
  wordDetails,
  selectWordHandler,
  scrollY,
}) => {
  const listRefArr = useRef([]).current;

  const setListRefArr = (routeIndex, ref) => {
    listRefArr[routeIndex] = ref;
  };

  const expandHeader = (routeIndex) => {
    const curRouteIndex = routeIndex === 0 ? 1 : 0;
    listRefArr[curRouteIndex].scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <Tab.Navigator
      initialRouteName='Definitions'
      lazy={true}
      swipeEnabled={false}
      tabBar={(props) => (
        <TabBar {...props} scrollY={scrollY} expandHeader={expandHeader} />
      )}
    >
      <Tab.Screen
        name='Definitions'
        options={{ tabBarLabel: "Definitions" }}
        children={() => (
          <DefinitionList
            wordDetails={wordDetails}
            selectWordHandler={selectWordHandler}
            scrollY={scrollY}
            forwardRef={setListRefArr}
            routeIndex={0}
          />
        )}
        style={styles.tabNav}
      ></Tab.Screen>
      <Tab.Screen
        name='Phrases'
        options={{ tabBarLabel: "Phrases" }}
        children={() => (
          <PhraseList
            word={wordDetails.word}
            scrollY={scrollY}
            forwardRef={setListRefArr}
            routeIndex={1}
          />
        )}
        options={{ tabBarLabel: "Phrases" }}
      />
    </Tab.Navigator>
  );
};

WordDetailsTabNavigator.propTypes = {
  wordDetails: PropTypes.object.isRequired,
  selectWordHandler: PropTypes.func.isRequired,
  scrollY: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: Colors.grayTint,
    zIndex: 100,
  },
  activeTab: {
    height: "100%",
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryTheme,
  },
  tab: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
  },
});

export default WordDetailsTabNavigator;
