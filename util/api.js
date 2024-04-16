import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// 创建 axios 实例
const api = axios.create({
    baseURL: 'http://uq3dgyxloddp.hk1.xiaomiqiu123.top',
    timeout: 5000 // 设置请求超时时间
});

// 请求拦截器
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    console.log("Token from storage:", token); // 查看 token
    if (token) {
        config.headers.token = `${token}`; // 如果 token 存在，添加到请求头
    }
    return config;
}, (error) => {
    // 请求错误处理
    return Promise.reject(error);
});

// 响应拦截器
api.interceptors.response.use((response) => {
    // 直接返回数据部分，这样在调用 API 时可以直接得到需要的数据
    return response.data;
}, (error) => {
    // 统一错误处理
    if (error.response && error.response.status === 500) {
        return Promise.reject({message: '服务器内部问题'});
    }
    return Promise.reject(error);
});

export default api;
