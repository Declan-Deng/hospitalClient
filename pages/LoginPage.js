import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../GlobalStyles";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../config";

import {
  MD2Colors,
  TextInput,
  Button,
} from "react-native-paper";
import api from "../util/api";

export default function LoginPagePage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);


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

  const handleLogin = async (phoneNumber, password, navigation) => {
    // 假设这里是你的输入验证函数
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

    try {
      const response = await api.post('member/login', {
        phone: phoneNumber,
        password: password,
      });

      console.log("Response received:", response); // 输出完整的响应内容看看是什么

      if (response.code === 1) {
        await AsyncStorage.setItem("userToken", response.data);
        Toast.show({
          type: "success",
          text1: "登录成功",
        });
        navigation.navigate("首页");
      } else {
        // 显示从后端返回的具体错误消息
        Toast.show({
          type: "error",
          text1: response.msg || "登录失败，请稍后再试",
        });
      }
    } catch (error) {
      // 这里要区分是网络错误还是其他类型的错误
      if (error.response) {
        // 如果服务器有响应，但是返回了错误状态码
        Toast.show({
          type: "error",
          text1: error.response.msg || "登录失败，错误信息：" + error.response.status,
        });
        console.log(error.response.msg);
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        Toast.show({
          type: "error",
          text1: "无法连接到服务器，请检查网络连接",
        });
        console.log(error.request);
      } else {
        // 在设置请求时触发了错误
        Toast.show({
          type: "error",
          text1: "请求错误：" + error.message,
        });
        console.log(error.message);
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate("注册");
  };

  const handleForget = () => {
    navigation.navigate("忘记密码");
  };

  const CustomButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
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
       <CustomButton onPress={() => handleLogin(phoneNumber, password, navigation)} title="登录">
      </CustomButton>
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
  button: {
    borderRadius: 10,
    width: "40%",
    alignSelf: "center",
    marginTop: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: "#1652ca", // 添加背景色
  },
  buttonText: {
    fontSize: 20,
    color: 'white', // 文本颜色
  }
});
