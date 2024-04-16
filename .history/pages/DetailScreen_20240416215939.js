import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SVGRenderer } from "@wuba/react-native-echarts";
import { SkiaChart } from "@wuba/react-native-echarts";
import { Card, Text } from "react-native-paper";

echarts.use([SVGRenderer, LineChart, GridComponent]);

export default function DetailScreen() {
  const route = useRoute();
  const { key } = route.params;
  const skiaRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const dataAnalysis = (data, lower, upper) => {
      let above = data.filter((value) => value > upper).length;
      let below = data.filter((value) => value < lower).length;

      if (above >= 8) return `近期${key}有点偏高哦！`;
      if (below >= 8) return `近期${key}有点偏低哦！`;
      return `${key}情况不错！`;
    };

    const options = {
      心率: {
        xAxis: {
          type: "category",
          data: Array.from({ length: 15 }, (_, i) => `第${i + 1}天`),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [
              102, 104, 89, 84, 89, 93, 102, 101, 101, 96, 101, 103, 87, 99,
              101,
            ],
            type: "line",
            smooth: true,
          },
        ],
        markArea: {
          data: [[{ name: "正常范围", yAxis: "60" }, { yAxis: "100" }]],
          itemStyle: {
            color: "rgba(160, 210, 255, 0.5)",
          },
        },
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
        markArea: {
          data: [[{ yAxis: "95" }, { yAxis: "100" }]],
          itemStyle: {
            color: "rgba(140, 233, 125, 0.5)",
          },
        },
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
        markArea: {
          data: [[{ yAxis: "36.5" }, { yAxis: "37.2" }]],
          itemStyle: {
            color: "rgba(255, 205, 210, 0.5)",
          },
        },
      },
    };

    if (skiaRef.current) {
      const chart = echarts.init(skiaRef.current, "light", {
        renderer: "svg",
        width: 400,
        height: 400,
      });
      chart.setOption(options[key]);
      const thresholds = {
        心率: [60, 100],
        血氧: [95, 100],
        体温: [36.5, 37.2],
      };
      const [lower, upper] = thresholds[key];
      setStatusMessage(dataAnalysis(options[key].series[0].data, lower, upper));
      return () => chart?.dispose();
    }
  }, [key]);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontWeight: "bold", fontSize: 20 }}
      >{`老人近年15日${key}变化`}</Text>
      <SkiaChart ref={skiaRef} style={styles.chart} />

      <Card style={styles.card}>
        <Card.Title title={statusMessage} titleVariant="headlineMedium" />
      </Card>

      <Card style={styles.card}>
        <Card.Title title={`关于${key}`} titleVariant="headlineMedium" />
        <Card.Content>
          <Text>
            {/* Display health tips based on `key` */}
            {key === "心率" &&
              `心率过高应减少咖啡因的摄入，控制盐的摄入，多摄入含镁食物，限制饱和脂肪和反式脂肪酸，适量饮水，避免暴饮暴食。
            \n\n心率过低应增加碳水化合物的摄入，摄入足够的蛋白质，保持水分平衡，控制血糖，避免过度饮酒`}
            {key === "体温" &&
              `体温过高应食用一些清凉降火的食物如西瓜、黄瓜、苦瓜、橙子等水果，以及凉性食材如苦瓜、黄瓜、丝瓜、绿豆等，避免食用油炸食品、辛辣食物、高糖食品等。
            \n\n体温过低应摄入适量的蛋白质，可以帮助维持肌肉组织，多摄入温热食物以及碳水化合物`}
            {key === "血氧" &&
              `血氧过高应均衡饮食，限制氧化剂摄入，多摄入新鲜的水果、蔬菜、全谷类、健康蛋白质和健康脂肪，避免过量摄入高糖、高脂肪和高盐食物。
            \n\n血氧过低应摄入富含铁的食物，如红肉、禽肉、鱼类、豆类、全谷类和绿叶蔬菜，避免过度饮酒和吸烟`}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 20,
  },
  chart: {
    width: 400,
    height: 200,
  },
  card: {
    padding: 10,
    width: "96%",
    marginBottom: 10,
    backgroundColor: "white",
  },
});
