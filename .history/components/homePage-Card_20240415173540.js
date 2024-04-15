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
  const [isChartReady, setChartReady] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setChartReady(false); // Reset the chart readiness state
  };
  const chartRef = useRef(null);

  useEffect(() => {
    if (isChartReady) {
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

      const chart = echarts.init(chartRef.current, "light", {
        renderer: "svg",
        width: 300,
        height: 300,
      });
      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, [isChartReady]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setChartReady(true);
      }, 500); // Delay chart initialization to ensure Modal and SkiaChart are fully visible
    }
  }, [visible]);

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
          onShow={() => setChartReady(true)} // Set the chart ready state when modal is fully visible
          contentContainerStyle={styles.modalContent}
        >
          <Text>这是一个模态框，点击外部可以关闭。</Text>
          {isChartReady && <SkiaChart ref={chartRef} />}
          <Button onPress={hideModal}>关闭</Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default HealthCard;
