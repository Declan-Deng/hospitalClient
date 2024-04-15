import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SVGRenderer, SkiaChart } from "@wuba/react-native-echarts";

echarts.use([SVGRenderer, LineChart, GridComponent]);

const HealthCard = ({ title, value, image }) => {
  const [visible, setVisible] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false); // 新增状态来控制图表加载
  const chartRef = useRef(null);

  // 控制模态框的显示和隐藏
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // 当模态框可见性变化时，处理图表加载的状态
  useEffect(() => {
    if (visible) {
      setChartLoaded(false); // 先设置为false确保图表重新加载
      setTimeout(() => {
        setChartLoaded(true); // 延迟设置为true确保组件已经挂载
      }, 100);
    }
  }, [visible]);

  // 处理图表的初始化和清理
  useEffect(() => {
    if (chartLoaded && chartRef.current) {
      const chart = echarts.init(chartRef.current, "light", {
        renderer: "svg",
        width: 300,
        height: 300,
      });

      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };

      chart.setOption(option);

      return () => {
        if (chart) {
          chart.dispose(); // 清理图表资源
        }
      };
    }
  }, [chartLoaded]);

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
      <TouchableOpacity onPress={showModal}>
        <Text>点击查看</Text>
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text>这是一个模态框，点击外部可以关闭。</Text>
          {chartLoaded && <SkiaChart ref={chartRef} />}
          <Button onPress={hideModal}>关闭</Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    color: "#007AFF",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default HealthCard;
