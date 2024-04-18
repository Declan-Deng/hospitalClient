import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dayjs.locale("zh-cn"); // Set locale for dates

    const ws = new WebSocket(
      "ws://uq3dgyxloddp.hk1.xiaomiqiu123.top/chat/user/2"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    // ws.onmessage = (event) => {
    //   console.log("Received raw data:", event.data);
    //   const data = JSON.parse(event.data);
    //   const incomingMessage = {
    //     _id: messages.length + 1,
    //     text: data.message,
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "Doctor",
    //       avatar: data.avatar || "../assets/doctor.jpg",
    //     },
    //   };
    //   setMessages((previousMessages) => {
    //     const updatedMessages = GiftedChat.append(
    //       previousMessages,
    //       incomingMessage
    //     );
    //     console.log("Updated messages:", updatedMessages);
    //     return updatedMessages;
    //   });
    // };

    // ws.onmessage = (event) => {
    //   console.log("Received raw data:", event.data);

    //   let messageData;
    //   try {
    //     // 尝试解析JSON，看是否为JSON数据
    //     messageData = JSON.parse(event.data);
    //   } catch (error) {
    //     // 如果解析失败，说明不是JSON，手动创建消息对象
    //     console.error("Error parsing JSON: ", error);
    //     messageData = {
    //       userName: "User", // 或者其他默认用户名
    //       avatar: "https://dummyimage.com/128x128/000000/ffffff&text=U", // 默认头像
    //       message: event.data, // 直接使用接收到的文本作为消息内容
    //     };
    //   }

    //   // 更新消息列表
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       id: prevMessages.length + 1, // 生成新的ID
    //       user: messageData.userName || "User",
    //       avatar:
    //         messageData.avatar ||
    //         "https://dummyimage.com/128x128/000000/ffffff&text=U",
    //       content: messageData.message,
    //     },
    //   ]);

    //   console.log("Processed message:", messageData);
    // };

    ws.onmessage = (event) => {
      console.log("Received raw data:", event.data);
      try {
        if (
          event.data &&
          typeof event.data === "string" &&
          event.data.startsWith("{") &&
          event.data.endsWith("}")
        ) {
          // 处理JSON格式的数据
          const data = JSON.parse(event.data);
          const incomingMessage = {
            _id: messages.length + 1,
            text: data.message,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Doctor",
              avatar: data.avatar || "../assets/doctor.jpg",
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, incomingMessage)
          );
          console.log("Processed message:", data);
        } else {
          // 处理非JSON格式的数据，把它也转换为消息对象
          const incomingMessage = {
            _id: messages.length + 1,
            text: event.data,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "System",
              avatar: "https://dummyimage.com/128x128/000000/ffffff&text=U",
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, incomingMessage)
          );
          console.log("Handled non-JSON data as message:", event.data);
        }
      } catch (error) {
        console.error("Error parsing JSON: ", error);
        console.error("Received data: ", event.data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const onSend = useCallback(
    (messagesToSend = []) => {
      messagesToSend.forEach((message) => {
        if (socket) {
          socket.send(
            JSON.stringify({
              targetUserId: "2",
              message: message.text,
            })
          );
        }
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messagesToSend)
      );
    },
    [socket]
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      textStyle={{
        left: { fontSize: 20 },
        right: { color: "black", fontSize: 20 },
      }}
      wrapperStyle={{
        left: { backgroundColor: "#fff", padding: 5 },
        right: { backgroundColor: "#95ec69", padding: 5 },
      }}
    />
  );

  const renderSend = (props) => (
    <Send
      {...props}
      alwaysShowSend={true}
      containerStyle={styles.sendContainer}
    >
      <View style={styles.sendBtn}>
        <Text style={{ color: "#ffffff", fontSize: 20 }}>发送</Text>
      </View>
    </Send>
  );

  const renderInputToolbar = (props) => (
    <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  );

  return (
    <SafeAreaView style={styles.mainContent}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 50,
          name: "阳光",
          avatar: "../assets/oldman.jpg",
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        locale={"zh-cn"}
        placeholder={"开始聊天吧"}
        textInputStyle={{ fontSize: 20, lineHeight: 18 }}
        inverted={true}
        renderUsernameOnMessage={true}
        alignTop={true}
      />
      <View style={{ backgroundColor: "white", height: 10 }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: "white",
    padding: 6,
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    paddingRight: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#ededed",
  },
  sendBtn: {
    width: 63,
    height: 32,
    borderRadius: 3,
    backgroundColor: "#07c160",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginRight: 5,
  },
});
