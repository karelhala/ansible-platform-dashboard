/* eslint camelcase: 0 */
import { getAxiosInstance } from '../shared/user-login';
import { AUTOMATION_HUB_API_BASE, AUTOMATION_HUB_UI_API_BASE } from '../../utilities/constants';

const axiosInstance = getAxiosInstance();

export const getCollections = () =>
  axiosInstance.get(
    `${AUTOMATION_HUB_UI_API_BASE}/repo/published/?deprecated=false&&limit=1`
  );

export const getPartners = () =>
  axiosInstance.get(
    `${AUTOMATION_HUB_UI_API_BASE}/namespaces?limit=1`
  );

export const getSyncCollections = (account) =>
  axiosInstance.get(
    `${AUTOMATION_HUB_API_BASE}/content/${account}-synclist/v3/collections?limit=1`
  );
