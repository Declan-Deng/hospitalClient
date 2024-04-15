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
          data: Array.from({ length: 15 }, (_, i) => `第${i + 1}天`),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [80, 82, 76, 84, 83, 75, 77, 79, 80, 82, 78, 76, 77, 79, 81],
            type: "line",
            smooth: true,
          },
        ],
      },
      血氧: {
        xAxis: {
          type: "category",
          data: Array.from({ length: 15 }, (_, i) => `第${i + 1}天`),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [
              98, 97, 99, 100, 100, 99, 98, 99, 100, 99, 98, 98, 97, 99, 100,
            ],
            type: "line",
            smooth: true,
          },
        ],
      },
      体温: {
        xAxis: {
          type: "category",
          data: Array.from({ length: 15 }, (_, i) => `第${i + 1}天`),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [
              36.5, 37.0, 37.2, 36.8, 36.6, 37.1, 36.9, 37.0, 37.2, 36.7, 36.8,
              37.0, 37.1, 36.9, 37.2,
            ],
            type: "line",
            smooth: true,
          },
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
      <Text
        style={{ fontWeight: "bold", fontSize: 20 }}
      >{`老人近年15日${key}变化`}</Text>
      <SkiaChart ref={skiaRef} style={styles.chart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    width: 400,
    height: 200,
  },
});
