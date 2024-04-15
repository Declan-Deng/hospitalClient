import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DetailSreen({ route }) {
  const { key } = route.params;

  return (
    <View>
      <Text>DetailSreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
