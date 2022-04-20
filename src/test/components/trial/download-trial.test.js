import downloadTrial from '../../../components/trial/download-trial';
import { SHA_CHECKSUM } from '../../../components/trial/constants';
import * as axios from '../../../helpers/shared/user-login';

describe('downloadTrial', () => {
  it('gets TOKEN and sends a request', async () => {
    const get = jest.fn();

    // eslint-disable-next-line no-import-assign
    axios.getAxiosInstance = () => ({
      get
    });

    const getToken = jest.fn().mockResolvedValue('TOKEN123');

    global.insights = {
      chrome: {
        auth: {
          getToken
        }
      }
    };

    await downloadTrial();

    expect(getToken).toHaveBeenCalled();
    expect(get).toHaveBeenCalledWith(
      `https://api.access.redhat.com/management/v1/images/${SHA_CHECKSUM}/download`,
      { headers: { Authorization: 'Bearer TOKEN123' }}
    );
  });
});
