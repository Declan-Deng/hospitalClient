import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../GlobalStyles";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../config";

import {
  ActivityIndicator,
  MD2Colors,
  HelperText,
  TextInput,
  Button,
} from "react-native-paper";

export default function LoginPagePage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);

  const [loading, setLoading] = useState(false);

  const inputActionHandler = (field, value) => {
    if (field === "phoneNumber") {
      setPhoneNumber(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  const validatePhoneNumber = (phone) => {
    return phone.length === 11 && /^\d+$/.test(phone);
  };

  const validatePassword = (pwd) => {
    return pwd.length >= 6 && pwd.length <= 16 && /^[A-Za-z0-9]+$/.test(pwd);
  };

  const handleLogin = async () => {
    // TODO: 测试专用
    navigation.navigate("首页");
    return;

    if (!phoneNumber) {
      Toast.show({ type: "error", text1: "手机号不能为空" });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Toast.show({ type: "error", text1: "手机号错误" });
      return;
    }

    if (!password) {
      Toast.show({ type: "error", text1: "密码不能为空" });
      return;
    }

    if (!validatePassword(password)) {
      Toast.show({
        type: "error",
        text1: "密码格式错误，密码为6-16位字母加数字",
      });
      return;
    }

    // navigation.navigate("首页");

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/member/login`, {
        phone: phoneNumber,
        password: password,
      });

      // 使用code字段判断登录是否成功
      if (response.data.code === 1) {
        // 登录成功，存储JWT到AsyncStorage
        await AsyncStorage.setItem("userToken", response.data.data);

        Toast.show({
          type: "success",
          text1: "登录成功",
        });
        // 登录成功，跳转到首页
        navigation.navigate("首页");
      } else {
        // 登录失败，显示后端返回的错误消息
        Toast.show({
          type: "error",
          text1: response.data.msg || "登录失败，请稍后再试",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // 显示更具体的错误信息
      Toast.show({
        type: "error",
        text1: error.response?.data?.msg || "登录失败，请检查网络连接",
      });
    }
  };

  const handleRegister = () => {
    navigation.navigate("注册");
  };

  const handleForget = () => {
    navigation.navigate("忘记密码");
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.headerText}>智慧养老院健康管理系统</Text>
      <Text style={styles.subHeaderText}>登录</Text>
      <TextInput
        label="请输入您的手机号"
        style={GlobalStyles.noPaddingInput}
        placeholderTextColor={MD2Colors.gray400}
        placeholder="输入手机号"
        value={phoneNumber}
        labelStyle={{ fontSize: 25 }}
        maxLength={11}
        onChangeText={(value) => inputActionHandler("phoneNumber", value)}
        right={<TextInput.Icon icon="phone" />}
      />

      <TextInput
        label="请输入您的密码"
        style={GlobalStyles.noPaddingInput}
        placeholder="输入密码"
        placeholderTextColor={MD2Colors.gray400}
        secureTextEntry={flatTextSecureEntry}
        value={password}
        onChangeText={(value) => inputActionHandler("password", value)}
        right={
          <TextInput.Icon
            icon={flatTextSecureEntry ? "eye" : "eye-off"}
            onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
            forceTextInputFocus={false}
          />
        }
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button onPress={handleRegister} labelStyle={{ fontSize: 16 }}>
          立即注册
        </Button>
        <Button onPress={handleForget} labelStyle={{ fontSize: 16 }}>
          忘记密码
        </Button>
      </View>
      <Button
        mode="elevated"
        style={GlobalStyles.button}
        buttonColor={"#1652ca"}
        textColor="white"
        onPress={handleLogin}
        labelStyle={GlobalStyles.ButtonFontStyles}
      >
        登录
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
    marginTop: 60,
    letterSpacing: 1,
  },
  subHeaderText: {
    fontSize: 25,
    marginBottom: 40,
    fontWeight: 200,
  },
});
