import { StyleSheet } from "react-native";
import React from "react";
import { Card, Text, View, Colors } from "react-native-ui-lib";

export default function homePage() {
  return (
    <View>
      <Text>homePage</Text>

      <Card row onPress={() => {}}>
        <Card.Image
          width={115}
          imageSource={require("../assets/favicon.png")}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
