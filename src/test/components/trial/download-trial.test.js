import downloadTrial from '../../../components/trial/download-trial';
import { ANSIBLE_CHECKSUM } from '../../../components/trial/constants';
import * as axios from '../../../helpers/shared/user-login';
import * as downloadFile from '../../../components/trial/download-file';

describe('downloadTrial', () => {
  it('gets TOKEN and sends a request', async () => {
    const get = jest.fn().mockResolvedValue({ body: { href: 'superfile.com' }});
    // eslint-disable-next-line no-import-assign
    downloadFile.default = jest.fn();

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
      { headers: {
        Accept: 'application/vnd.rhsm.noredirect+json',
        Authorization: 'Bearer TOKEN123'
      }}
    );
    expect(downloadFile.default).toHaveBeenCalledWith('superfile.com');
  });
});
