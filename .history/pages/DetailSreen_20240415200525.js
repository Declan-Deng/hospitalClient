import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function DetailSreen({ route, navigation }) {
  const { key } = route.params;

  return (
    <View>
      <Text>DetailSreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
