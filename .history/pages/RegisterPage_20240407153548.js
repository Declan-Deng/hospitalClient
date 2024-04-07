import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MD2Colors, TextInput, Button } from "react-native-paper";
import GlobalStyles from "../GlobalStyles";

export default function RegisterPage() {
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [elderName, setElderName] = useState("");

  const handleRegister = () => {
    // 这里应该是你的注册逻辑
    console.log("注册逻辑，待实现");
  };

  return (
    <View style={GlobalStyles.container}>
      <TextInput
        label="请输入用户名"
        style={GlobalStyles.noPaddingInput}
        placeholderTextColor={MD2Colors.gray400}
        placeholder="输入用户名"
        value={userName}
        onChangeText={(value) => setUserName(value)}
        right={<TextInput.Icon name="account" />}
      />
      <TextInput
        label="请输入11位手机号"
        style={GlobalStyles.noPaddingInput}
        placeholderTextColor={MD2Colors.gray400}
        placeholder="输入手机号"
        value={phoneNumber}
        onChangeText={(value) => setPhoneNumber(value)}
        right={<TextInput.Icon name="phone" />}
      />
      <TextInput
        label="请输入验证码"
        style={GlobalStyles.noPaddingInput}
        placeholderTextColor={MD2Colors.gray400}
        placeholder="输入验证码"
        value={verificationCode}
        onChangeText={(value) => setVerificationCode(value)}
        right={<TextInput.Icon name="message" />}
      />
      <TextInput
        label="请输入老人姓名"
        style={GlobalStyles.noPaddingInput}
        placeholderTextColor={MD2Colors.gray400}
        placeholder="输入姓名"
        value={elderName}
        onChangeText={(value) => setElderName(value)}
        right={<TextInput.Icon name="face" />}
      />
      <TextInput
        label="请输入您的密码"
        style={GlobalStyles.noPaddingInput}
        placeholder="输入密码"
        placeholderTextColor={MD2Colors.gray400}
        secureTextEntry={flatTextSecureEntry}
        value={password}
        onChangeText={(value) => setPassword(value)}
        right={
          <TextInput.Icon
            name={flatTextSecureEntry ? "eye" : "eye-off"}
            onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
          />
        }
      />
      <TextInput
        label="请再次输入您的密码"
        style={GlobalStyles.noPaddingInput}
        placeholder="确认密码"
        placeholderTextColor={MD2Colors.gray400}
        secureTextEntry={flatTextSecureEntry}
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        right={
          <TextInput.Icon
            name={flatTextSecureEntry ? "eye" : "eye-off"}
            onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
          />
        }
      />
      <Button mode="contained" onPress={handleRegister}>
        注册
      </Button>
    </View>
  );
}

// 如果有需要共享的样式可以放在这里
const styles = StyleSheet.create({});