import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import HealthCard from "../components/homePage-Card";
import ProfileCard from "../components/homePage-Profile";
import AlertCard from "../components/homePage-Alert";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import globalStyles from "../GlobalStyles";
import request from "../util/api";
// import request from "../util/request";
import { useNavigation } from "@react-navigation/native";

const stateMap = [
  {
    key: "heartRate",
    title: "心率",
    image: require("../assets/homepage/heart.png"),
  },
  {
    key: "bodyTemperature",
    title: "体温",
    image: require("../assets/homepage/blood-pressure.png"),
  },
  {
    key: "oxygenLevel",
    title: "血氧",
    image: require("../assets/homepage/blood-glucose.png"),
  },
];

const Homepage = () => {
  const navigation = useNavigation();
  const [healthData, setHealthData] = useState([]);
  // const buttonData = [
  //   { image: require("../assets/homepage/setting.png"), indexText: "设置" },
  // ];
  const [personData, setPersonData] = useState({});
  const [alertData, setAlertData] = useState([]);

  const handlePress = (key) => {
    console.log("Navigating to DetailScreen with key:", key);

    navigation.navigate("详情界面", { key: key });
  };

  useEffect(() => {
    const fetchData = async () => {
      // 在这里发送请求获取最新的数据
      let newHealthData = await request("/resident/nowinfo");
      let newPersonData = await request("/resident/info");
      let newAlertData = await request("/resident/exception");

      // // TODO: 测试专用
      // console.log(newHealthData, newPersonData, newAlertData);

      // 数据处理
      newPersonData = {
        age: newPersonData.data.age,
        name:
          (newPersonData.data.firstName ? newPersonData.data.firstName : "") +
          " " +
          (newPersonData.data.lastName ? newPersonData.data.lastName : ""),
        guardian: newPersonData.data.guardian
          ? newPersonData.data.guardian
          : "",
      };

      let stateArray = [];

      for (let key in newHealthData.data) {
        // console.log(key);
        stateMap.forEach((item) => {
          if (key === item.key) {
            let obj = {
              title: item.title,
              value: newHealthData.data[key],
              image: item.image,
            };
            stateArray.push(obj);
          }
        });
      }

      let alertDataArr = [];

      for (let key in newAlertData.data) {
        let obj = {
          id: key,
          starttime: newAlertData.data[key].exceptionStartTime,
          endtime: newAlertData.data[key].exceptionEndTime,
          info: newAlertData.data[key].exceptionInfo,
          type: newAlertData.data[key].isCurrent ? "current" : "history",
          number: newAlertData.data[key].phone,
        };
        alertDataArr.push(obj);
      }

      // 更新状态
      setHealthData(stateArray);
      setPersonData(newPersonData);
      setAlertData(alertDataArr);
    };

    fetchData();

    // TODO: 更改时间间隔
    const interval = setInterval(fetchData, 5000); // 每5分钟获取一次数据

    return () => {
      clearInterval(interval); // 在组件卸载时清除定时器
    };
  }, []);

  const UserStatusScreen = () => (
    <View style={styles.tabContainer}>
      <ScrollView style={styles.scroll}>
        {healthData.map((item, index) => (
          <HealthCard
            key={index}
            title={item.title}
            value={`${item.value}`}
            image={item.image}
            onPress={() => handlePress(item.title)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const AlertInfoScreen = () => (
    <View style={styles.tabContainer}>
      {alertData.map((item, index) => (
        <AlertCard
          key={index}
          starttime={item.starttime}
          endtime={item.endtime}
          info={item.info}
          type={item.type}
        />
      ))}
    </View>
  );

  const initialLayout = { width: Dimensions.get("window").width };

  // const renderScene = SceneMap({
  //     userStatus: UserStatusScreen,
  //     alertInfo: AlertInfoScreen,
  // });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "userStatus":
        return (
          <UserStatusScreen style={{ height: 6000, overflow: "scroll" }} />
        );
      case "alertInfo":
        return <AlertInfoScreen style={{ height: 6000, overflow: "scroll" }} />;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "userStatus", title: "用户状态" },
    { key: "alertInfo", title: "报警信息" },
  ]);

  return (
    <View style={globalStyles.container}>
      <ProfileCard info={personData} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 10,
            }}
            indicatorStyle={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              height: 2,
            }}
            activeColor="blue"
            inactiveColor="black"
            labelStyle={{ fontSize: 16 }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  scroll: {
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
    backgroundColor: "#f0f0f0",
    height: 60,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "scroll",
    width: "100%",
  },
  button: {
    marginRight: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  tabContainer: {
    paddingVertical: 20,
    height: 600,
    overflow: "scroll",
  },
});

export default Homepage;
