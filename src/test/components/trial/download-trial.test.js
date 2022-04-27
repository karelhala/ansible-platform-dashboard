import downloadTrial from '../../../components/trial/download-trial';
import { ANSIBLE_CHECKSUM } from '../../../components/trial/constants';
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

    await downloadTrial(ANSIBLE_CHECKSUM);

    expect(getToken).toHaveBeenCalled();
    expect(get).toHaveBeenCalledWith(
      `https://api.access.redhat.com/management/v1/images/${ANSIBLE_CHECKSUM}/download`,
      { headers: { Authorization: 'Bearer TOKEN123' }}
    );
  });
});
