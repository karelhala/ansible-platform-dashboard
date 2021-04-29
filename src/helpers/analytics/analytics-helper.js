/* eslint camelcase: 0 */
import { getAxiosInstance } from '../shared/user-login';
import { ANALYTICS_API_BASE } from '../../utilities/constants';

const axiosInstance = getAxiosInstance();

export const getClusters = () => {
  return axiosInstance.post(
    `${ANALYTICS_API_BASE}/clusters?limit=1`
  );
};

export const getNotifications = (severity = 'error') =>
  axiosInstance.get(
    `${ANALYTICS_API_BASE}/notifications?severity=${severity}&limit=1`
  );

export const getJobs = () =>
  axiosInstance.get(
    `${ANALYTICS_API_BASE}/jobs?limit=1`
  );
