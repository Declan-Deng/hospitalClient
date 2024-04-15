// HealthCard.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SVGRenderer, SkiaChart } from "@wuba/react-native-echarts";

const HealthCard = ({ title, value, image }) => {
  // 状态用于控制Modal的显示
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
