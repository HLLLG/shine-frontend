import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : 'http://shine-backend.hlllg.cn/api'
});

myAxios.defaults.withCredentials = true; // 携带请求凭证

declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> {}
}

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦', response)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 未登录则跳转到登陆页面
    if (response?.data?.code == 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;

