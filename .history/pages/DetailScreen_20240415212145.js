import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SVGRenderer } from "@wuba/react-native-echarts";
import { SkiaChart } from "@wuba/react-native-echarts";

echarts.use([SVGRenderer, LineChart, GridComponent]);

export default function DetailScreen() {
  const route = useRoute();
  const { key } = route.params;
  const skiaRef = useRef(null);

  useEffect(() => {
    const options = {
      心率: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: { type: "value" },
        series: [{ data: [70, 72, 76, 74, 73, 75, 77], type: "line" }],
      },
      血氧: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: { type: "value" },
        series: [{ data: [98, 97, 99, 100, 100, 99, 98], type: "line" }],
      },
      体温: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: { type: "value" },
        series: [
          { data: [36.5, 37.0, 37.2, 36.8, 36.6, 37.1, 36.9], type: "line" },
        ],
      },
    };

    let chart;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "light", {
        renderer: "svg",
        width: 400,
        height: 400,
      });
      chart.setOption(options[key]);
    }

    return () => chart?.dispose();
  }, [key]);

  return (
    <View style={styles.container}>
      <Text>{`这里是 ${key} 的详细信息`}</Text>
      <SkiaChart ref={skiaRef} style={styles.chart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    width: 400,
    height: 400,
  },
});
