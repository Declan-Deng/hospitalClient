import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/homePage';
import PersonalPage from "../pages/PersonalPage";
import { mdiHome, mdiHomeOutline, mdiAccount, mdiAccountOutline } from '@mdi/js';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from '@mdi/react'; // 引入@mdi/react图标组件


const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => { // 移除了 size 参数，因为我们将直接指定大小
                    let iconPath;

                    if (route.name === '主页') {
                        iconPath = focused ? mdiHome : mdiHomeOutline;
                    } else if (route.name === '个人') {
                        iconPath = focused ? mdiAccount : mdiAccountOutline;
                    }

                    // 增加图标大小，例如设置为 1.5 倍
                    return <Icon path={iconPath} size={1.5} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 70 }, // 设置标签栏的高度
                tabBarLabelStyle: { fontSize: 15 }, // 增加标签文字的大小
            })}

        >
            <Tab.Screen
                name="主页"
                component={HomeScreen}
                options={{
                headerShown: false,
            }}/>
            <Tab.Screen
                name="个人"
                component={PersonalPage}
                options={{
                    headerShown: false,
                }}/>
            {/*<Tab.Screen*/}
            {/*    name="Settings"*/}
            {/*    component={Setting}*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*    }}/>*/}

        </Tab.Navigator>
    );
}

export default TabNavigator;
