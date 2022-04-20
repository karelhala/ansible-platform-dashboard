import { getAxiosInstance } from '../../helpers/shared/user-login';
import { SHA_CHECKSUM } from './constants';

const downloadTrial = async () => {
  const token = await insights.chrome.auth.getToken();

  return getAxiosInstance()
  .get(`https://api.access.redhat.com/management/v1/images/${SHA_CHECKSUM}/download`,
    { headers: { Authorization: `Bearer ${token}` }}
  );
};

export default downloadTrial;
