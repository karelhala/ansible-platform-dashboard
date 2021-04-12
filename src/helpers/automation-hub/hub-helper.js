/* eslint camelcase: 0 */
import { getAxiosInstance } from '../shared/user-login';
import { AUTOMATION_HUB_API_BASE } from '../../utilities/constants';

const axiosInstance = getAxiosInstance();

const getCollections = () =>
  axiosInstance.get(
    `${AUTOMATION_HUB_API_BASE}/repo/published/?deprecated=false?limit=1`
  );

const getPartners = () =>
  axiosInstance.get(
    `${AUTOMATION_HUB_API_BASE}/namespaces/?limit=1`
  );
