import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  SafeAreaView,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import MonthsContainer from "../components/MonthsContainer";
import FilterBar from "../components/FilterBar";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const ArchivedScreen = ({ navigation }) => {
  const wordsArchived = useSelector((state) => state.words.wordsArchived);
  const wordsArchivedList = useSelector(
    (state) => state.words.wordsArchivedList
  );
  const today = new Date();
  const [yearSelected, setYearSelected] = useState(today.getFullYear());
  const [monthSelected, setMonthSelected] = useState(today.getMonth()); // month index
  const [wordsList, setWordsList] = useState(
    wordsArchived[yearSelected][monthSelected]
  );
  const [isFilterMode, setIsFilterMode] = useState(false);
  const handleCancelFilter = useRef(null);
  const containerHeight = useRef(null);
  const animatedList = useRef(new Animated.Value(0)).current;
  const animatedCancelBtn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setWordsList(wordsArchived[yearSelected][0]);
  }, [yearSelected]);

  useEffect(() => {
    if (isFilterMode) {
      setWordsList([]);
    } else {
      setWordsList(wordsArchived[yearSelected][monthSelected]);
    }
  }, [monthSelected, isFilterMode]);

  const selectWordHandler = (word) => {
    navigation.push("WordDetails", {
      word,
    });
  };

  const handleFilterSearch = (input) => {
    const wordsFiltered = wordsArchivedList.filter((archivedWord) => {
      const multiWord = archivedWord.split(" ");
      if (multiWord.length > 1) {
        for (let i = 0; i < multiWord.length; i++) {
          if (multiWord[i].startsWith(input)) return true;
        }
      }
      return archivedWord.startsWith(input);
    });
    setWordsList(wordsFiltered);
  };

  const clearWordsList = () => {
    setWordsList([]);
  };

  const initContainerHeight = (event) => {
    containerHeight.current = event.nativeEvent.layout.height;
  };

  const setCancelFilterRef = (ref) => {
    handleCancelFilter.current = ref;
  };

  const toggleFilterMode = () => {
    // Animate List
    const listFinalValue = isFilterMode ? 0 : -containerHeight.current;
    Animated.spring(animatedList, {
      toValue: listFinalValue,
      bounciness: 0,
      useNativeDriver: false,
    }).start();

    // Animate Close Button
    const btnFinalValue = isFilterMode ? 0 : 1;
    Animated.timing(animatedCancelBtn, {
      toValue: btnFinalValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsFilterMode(!isFilterMode);
  };

  const cancelFilterMode = () => {
    if (isFilterMode) {
      toggleFilterMode();
      handleCancelFilter.current();
    }
  };

  const getYearsForSelector = () => {
    const yearsData = [];
    let index = 0;
    for (year in wordsArchived) {
      yearsData.push({
        key: index,
        label: year,
      });
      index++;
    }
    return yearsData;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View onLayout={(e) => initContainerHeight(e)}>
          <View style={{ alignSelf: "flex-start" }}>
            <ModalSelector
              data={getYearsForSelector()}
              initValue={today.getFullYear().toString()}
              supportedOrientations={["portrait"]}
              animationType='fade'
              accessible={true}
              scrollViewAccessibilityLabel={"Scrollable options"}
              cancelButtonAccessible={true}
              cancelButtonAccessibilityLabel={"Cancel Button"}
              onChange={(option) => setYearSelected(option.label)}
            >
              <View style={styles.yearSelector}>
                <CustomText option='large'>{yearSelected}</CustomText>
                <Ionicons
                  name='ios-caret-down'
                  size={22}
                  style={styles.icon}
                  color='#dbdbdb'
                />
              </View>
            </ModalSelector>
          </View>

          <View style={styles.monthsContainer}>
            <MonthsContainer
              monthSelected={monthSelected}
              setMonthSelected={setMonthSelected}
            />
          </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: "100%" }}>
          <Animated.View
            style={{ top: animatedList, ...styles.animatedContainer }}
          >
            <View style={styles.listContainer}>
              <View style={styles.filterBarContainer}>
                <FilterBar
                  handleFilterSearch={handleFilterSearch}
                  clearWordsList={clearWordsList}
                  isFilterMode={isFilterMode}
                  toggleFilterMode={toggleFilterMode}
                  forwardRefCancelFilter={setCancelFilterRef}
                />
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX: animatedCancelBtn.interpolate({
                          inputRange: [0, 1],
                          outputRange: [100, 0],
                        }),
                      },
                    ],
                  }}
                >
                  {isFilterMode && (
                    <TouchableOpacity onPress={cancelFilterMode}>
                      <CustomText style={styles.cancelBtn} option='thin'>
                        Cancel
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </Animated.View>
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
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

ArchivedScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grayTint,
  },
  screen: {
    flex: 1,
    alignItems: "flex-start",
  },
  yearSelector: {
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 8,
  },
  filterBarContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelBtn: {
    paddingLeft: 15,
    color: Colors.primaryTheme,
  },
  listContainer: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 35,
    backgroundColor: Colors.background,
  },
  list: {
    height: "100%",
    paddingTop: 30,
  },
  listWord: {
    paddingVertical: 8,
  },
  animatedContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ArchivedScreen;
