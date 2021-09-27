import axios, { AxiosRequestConfig } from "axios";
import { RESAS_API_KEY, RESAS_ENDPOINT } from "@utils/environment";

const resaxios = axios.create();

resaxios.defaults.baseURL = RESAS_ENDPOINT;
resaxios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers.common["x-api-key"] = RESAS_API_KEY;
    return config;
});

const customAxios = axios.create();

export { resaxios, customAxios };
