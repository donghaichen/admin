import axios from "axios"
import router from '../router'
import {LoadingBar, Message} from 'view-design'
import QS from 'qs'

// 创建一个axios实例
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000 // 设置超时时间为 5s
});

// request 拦截器 ==> 对请求参数进行处理
request.interceptors.request.use(
    config => {
        LoadingBar.start()
        if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
        }
        console.log(config.data)
        if (config.method === 'post')
        {
            config.data = QS.stringify(config.data)
        }
        console.log(config)
        return config;
    }, error => {
        // 处理请求错误
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// response 拦截器 ==> 对响应做处理
request.interceptors.response.use(
    response => {
        LoadingBar.finish()
        const res = response.data;
        if (response.status !== 200) {
            return Promise.reject(new Error(res.message || "Error"))
        } else {
            return res;
        }
    }, error => {
        // 判断error的status代码，并将对应的信息告知用户
        let text = "";
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    text = "请求错误(400)，请重新申请";
                    break;
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    localStorage.removeItem('token');
                    text = "用户未授权或授权已过期，请重新登录";
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                case 403:
                    text = "拒绝访问(403)";
                    break;
                case 404:
                    text = "请求出错(404)";
                    break;
                case 408:
                    text = "请求超时(408)";
                    break;
                case 500:
                    text = "服务器错误(500)，请重启软件或联系网站管理员！";
                    break;
                case 501:
                    text = "服务未实现(501)";
                    break;
                case 502:
                    text = "网络错误(502)";
                    break;
                case 503:
                    text = "服务不可用(503)";
                    break;
                case 504:
                    text = "网络超时(504)";
                    break;
                case 505:
                    text = "HTTP版本不受支持(505)";
                    break;
                default:
                    text = "网络连接出错";
            }
        } else {
            text = "连接服务器失败,请重试!";
        }
        Message.error({
            content: text,
        });
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// 将写好的axios实例暴露出去
export default request;