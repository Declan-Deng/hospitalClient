import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/homePage";
import PersonalPage from "../pages/PersonalPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          // 移除了 size 参数，因为我们将直接指定大小
          let iconName;
          let IconComponent; // 用于根据路由决定使用哪个图标库组件

          if (route.name === "主页") {
            IconComponent = Ionicons;
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "个人") {
            IconComponent = MaterialCommunityIcons;
            iconName = focused ? "account-circle" : "account-circle-outline";
          }

          return <IconComponent name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {{ height: 70 }}, // 设置标签栏的高度
        tabBarLabelStyle: {{ fontSize: 15 }}, // 增加标签文字的大小
      })}
    >
      <Tab.Screen
        name="主页"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="个人"
        component={PersonalPage}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
