import axios from 'axios';
import { stringify } from 'qs';

const axiosInstance = axios.create({
  paramsSerializer: (params) => stringify(params)
});

const resolveInterceptor = (response) => response.data || response;
const errorInterceptor = (error = {}) => {
  const requestId = error.response?.headers?.['x-rh-insights-request-id'];
  throw requestId ? { ...error.response, requestId } : { ...error.response };
};

// check identity before each request. If the token is expired it will log out user
axiosInstance.interceptors.request.use(async (config) => {
  await window.insights.chrome.auth.getUser();
  return config;
});
axiosInstance.interceptors.response.use(resolveInterceptor);
axiosInstance.interceptors.response.use(undefined, errorInterceptor);

export function getAxiosInstance() {
  return axiosInstance;
}
