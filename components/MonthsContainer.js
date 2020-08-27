import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

import CustomText from "./CustomText";
import Colors from "../constants/Colors";

const monthList = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const MonthsContainer = ({ monthSelected, setMonthSelected }) => {
  const scrollRef = useRef(null);
  const xPositions = useRef([]);

  useEffect(() => {
    animateMonthsContainer(monthSelected);
  }, [monthSelected]);

  const animateMonthsContainer = (monthIndex) => {
    if (scrollRef.current)
      scrollRef.current.scrollTo({
        x: xPositions.current[monthIndex],
        y: 0,
        animated: true,
      });
  };

  return (
    <View style={styles.monthsContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {monthList.map((item, index) => (
          <TouchableWithoutFeedback
            key={item}
            onPress={() => setMonthSelected(index)}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              xPositions.current[index] = layout.x;

              if (index === monthSelected && scrollRef.current) {
                scrollRef.current.scrollTo({
                  x: layout.x,
                  y: 0,
                  animated: true,
                });
              }
            }}
          >
            <View style={styles.monthSelector}>
              <CustomText
                style={{
                  color:
                    index === monthSelected
                      ? Colors.primaryTheme
                      : Colors.secondaryText,
                }}
                option='subLargeGray'
              >
                {item}
              </CustomText>
              <View
                style={{
                  backgroundColor:
                    index === monthSelected
                      ? Colors.primaryTheme
                      : "transparent",
                  ...styles.monthIndicator,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

MonthsContainer.propTypes = {
  monthSelected: PropTypes.number.isRequired,
  setMonthSelected: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  monthsContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  monthSelector: {
    marginRight: 26,
    alignItems: "center",
  },
  monthIndicator: {
    marginVertical: 5,
    height: 15,
    width: 15,
    borderRadius: 50,
  },
});

export default MonthsContainer;
