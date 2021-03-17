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

const unauthorizedInterceptor = (error) => {
  if (error.status === 403) {
    throw {
      ...error,
      redirect: {
        pathname: '/403',
        message: error.config?.url
      }
    };
  }

  throw error;
};

// check identity before each request. If the token is expired it will log out user
axiosInstance.interceptors.request.use(async (config) => {
  await window.insights.chrome.auth.getUser();
  return config;
});
axiosInstance.interceptors.response.use(resolveInterceptor);
axiosInstance.interceptors.response.use(undefined, errorInterceptor);
axiosInstance.interceptors.response.use(undefined, unauthorizedInterceptor);

export function getAxiosInstance() {
  return axiosInstance;
}
