import axios, { AxiosInstance } from 'axios';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器 - 自动附加 token
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器 - 401 时清除 token 并跳转登录
request.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/static/';
        }
        return Promise.reject(error);
    }
);

/**
 * GET 请求
 * @param url  接口路径
 * @param params  查询参数对象（会自动拼到 URL ?xxx=yyy）
 */
export const get = async <T = unknown>(
    url: string,
    params?: Record<string, unknown>
): Promise<T> => {
    const response = await request.get<T>(url, { params });
    return response.data;
};

/**
 * POST 请求
 * @param url   接口路径
 * @param data  请求体
 */
export const post = async <T = unknown>(
    url: string,
    data?: unknown
): Promise<T> => {
    const response = await request.post<T>(url, data);
    return response.data;
};

/**
 * PUT 请求
 * @param url   接口路径
 * @param data  请求体
 */
export const put = async <T = unknown>(
    url: string,
    data?: unknown
): Promise<T> => {
    const response = await request.put<T>(url, data);
    return response.data;
};

/**
 * DELETE 请求
 * @param url 接口路径
 */
export const del = async <T = unknown>(url: string): Promise<T> => {
    const response = await request.delete<T>(url);
    return response.data;
};

export default request;
