import axios from "axios";

// 上传文件路径集合
const uploadUrls = [];
// 下载报表路径集合
const blobUrls = [];
// 定义接口
// 取消重复请求
const pending = [];
const CancelToken = axios.CancelToken;
// 移除重复请求
const removePending = (config) => {
    for (const key in pending) {
        const item = +key;
        const list = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            // 执行取消操作
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};
// 初始化
const instance = axios.create({
    timeout: 10000,
    baseURL:
        process.env.NODE_ENV === "development"
            ? "/api"
            : "http://127.0.0.1:7778",
    withCredentials: true
});

// instance.defaults.transformRequest = [
//     function (data) {
//         console.log(qs.stringify(data));
//         return qs.stringify(data);
//     },
// ];
instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=utf-8;";
// 请求拦截
instance.interceptors.request.use(
    (config) => {
        removePending(config);
        config.cancelToken = new CancelToken((c) => {
            pending.push({ url: config.url, method: config.method, params: config.params, data: config.data, cancel: c });
        });
        // config.headers['Cookie'] = "JSESSIONID="+sessionStorage.getItem("JSESSIONID") || "";
        // config.headers["token"] = sessionStorage.getItem("token") || "";
        // hide = message.loading({content: 'Loading...', duration: 0});
        // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
        // if (config.url.includes('pur/contract/export')) {
        //     config.headers['responseType'] = 'blob'
        // }
        // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
        // if (config.url.includes('pur/contract/upload')) {
        //     config.headers['Content-Type'] = 'multipart/form-data'
        // }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
// 响应拦截
instance.interceptors.response.use(
    (response) => {
        if (response.statusText === "OK") {
            // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
            return Promise.resolve(response.data);
        } else {
            // message.error('响应超时')
            return Promise.reject(response.data.message);
        }
    },
    (error) => {
        const response = error.response;
        // 超时重新请求
        const config = error.config;
        // 全局的请求次数,请求的间隙
        const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];
        if (config && RETRY_COUNT) {
            // 设置用于跟踪重试计数的变量
            config.__retryCount = config.__retryCount || 0;
            // 检查是否已经把重试的总数用完
            if (config.__retryCount >= RETRY_COUNT) {
                return Promise.reject(response || { message: error.message });
            }
            // 增加重试计数
            config.__retryCount++;
            // 创造新的Promise来处理指数后退
            const backoff = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, RETRY_DELAY || 1);
            });
            // instance重试请求的Promise
            return backoff.then(() => {
                return instance(config);
            });
        }
        return Promise.reject(response || { message: error.message });
    }
);

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: "get",
            url,
            params,
            ...config,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: "post",
            url,
            data,
            ...config,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};
