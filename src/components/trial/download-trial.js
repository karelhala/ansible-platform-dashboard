import { getAxiosInstance } from '../../helpers/shared/user-login';
import downloadFile from './download-file';

const downloadTrial = async (cheksum) => {
  const token = await insights.chrome.auth.getToken();

  try {
    const url = await getAxiosInstance()
    .get(`https://api.access.redhat.com/management/v1/images/${cheksum}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.rhsm.noredirect+json'
        }
      }
    );

    downloadFile(url.body.href);
  } catch (e) {
    console.error(e);
  }
};

export default downloadTrial;
