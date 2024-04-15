import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function DetailScreen({ route, navigation }) {
  const { key } = route.params;

  return (
    <View>
      <Text>{`这里是 ${key} 的详细信息`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
