import { getAxiosInstance } from '../../helpers/shared/user-login';

const downloadTrial = async (cheksum) => {
  const token = await insights.chrome.auth.getToken();

  return getAxiosInstance()
  .get(`https://api.access.redhat.com/management/v1/images/${cheksum}/download`,
    { headers: { Authorization: `Bearer ${token}` }}
  );
};

export default downloadTrial;
