import React, { useCallback, Fragment } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { BarChart } from "react-native-chart-kit";

import { MONTHS_LIST } from "../constants/OrderedItems";
import CustomText from "./CustomText";
import { capitalize } from "../utils/helper";

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(36, 49, 71, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.6,
  strokeWidth: 10,
  style: {
    borderRadius: 16,
  },
};

const BarChartGraph = () => {
  const wordsArchived = useSelector((state) => state.words.wordsArchived);

  const dataLastSixMonths = useCallback(() => {
    const today = new Date();
    const currMonth = today.getMonth();
    const currYear = today.getFullYear();
    const currYearData = wordsArchived[currYear];

    let labels = [];
    let data = [];

    for (let i = 0, monthIndex = currMonth; i < 6; i++, monthIndex--) {
      labels.unshift(capitalize(MONTHS_LIST[monthIndex]));
      data.unshift(currYearData[monthIndex].length);
      if (monthIndex === 0) monthIndex = 12;
    }

    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };
  }, [wordsArchived]);

  return (
    <Fragment>
      <CustomText option='body' style={styles.chartTitle}>
        Words Archived
      </CustomText>
      <BarChart
        data={dataLastSixMonths(wordsArchived)}
        width={Dimensions.get("window").width - 72} // 40 (ScrollView padding) + 32 (ProfileCard padding) = 72
        height={200}
        chartConfig={chartConfig}
        style={styles.chartStyle}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    marginTop: 30,
  },
  chartStyle: {
    marginTop: 15,
    paddingRight: 48,
  },
});

export default BarChartGraph;
