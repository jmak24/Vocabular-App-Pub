import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  StyleSheet,
  Picker,
} from "react-native";
// import { Picker } from "@react-native-community/picker";

import FilterBar from "../components/FilterBar";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const ArchivedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const archivedWordsList = useSelector(
    (state) => state.words.archivedWordsList
  );
  const today = new Date();
  const [yearSelected, setYearSelected] = useState(today.getFullYear());
  const [monthSelected, setMonthSelected] = useState(today.getMonth());
  const wordsList = archivedWordsList[yearSelected][monthSelected];
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

  const selectWordHandler = (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  const selectMonthHandler = (monthIndex) => {
    setMonthSelected(monthIndex);
  };

  return (
    <View style={styles.screen}>
      <CustomText style={styles.year} option='large'>
        {yearSelected}
      </CustomText>
      <Picker
        style={{ height: 100, width: 200 }}
        selectedValue={yearSelected}
        onValueChange={(year) => setYearSelected(year)}
      >
        <Picker.Item label='2020' value='2020' />
        <Picker.Item label='2020' value='2019' />
      </Picker>
      <View style={styles.monthsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {monthList.map((item, index) => (
            <TouchableWithoutFeedback
              key={item}
              onPress={() => selectMonthHandler(index)}
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
      <View style={styles.listContainer}>
        <View style={styles.filterBarContainer}>
          <FilterBar />
        </View>
        <FlatList
          data={wordsList}
          style={styles.list}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item}
                style={styles.listWord}
                onPress={() => selectWordHandler(item)}
              >
                <CustomText option='subLarge'>{item}</CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: "flex-start",
    paddingTop: 50,
    backgroundColor: Colors.grayTint,
  },
  year: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
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
  filterBarContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: Colors.background,
  },
  list: {
    height: "100%",
    paddingTop: 30,
  },
  listWord: {
    paddingVertical: 8,
  },
});

export default ArchivedScreen;
