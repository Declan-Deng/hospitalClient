import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SVGRenderer, SkiaChart } from "@wuba/react-native-echarts";

const DetailsScreen = ({ route }) => {
  const { key } = route.params;

  // 根据key决定显示什么数据
  // 例如使用 key 来从某个API获取数据或从本地状态获取

  return (
    <View>
      <Text>{`这里显示 ${key} 的详细数据`}</Text>
    </View>
  );
};
