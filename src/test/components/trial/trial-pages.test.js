import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import UserContext from '../../../user-context';

import Overview from '../../../components/trial/overview';
import Success from '../../../components/trial/success';
import Expired from '../../../components/trial/expired';
import trialMessages from '../../../messages/trial.messages';
import { BETA_TRIAL_PAGE, TRIAL_PAGE } from '../../../components/trial/constants';
import * as downloadTrial from '../../../components/trial/download-trial';

const ComponentWrapper = ({ initialEntries = [ '/ansible-dashboard' ], children }) => (
  <MemoryRouter initialEntries={ initialEntries }>
    <IntlProvider locale="en">
      <UserContext.Provider
        value={ { permissions: []} }
      >
        { children }
      </UserContext.Provider>
    </IntlProvider>
  </MemoryRouter>
);

describe('Trial pages', () => {
  beforeEach(() => {
    global.insights = {
      chrome: {
        isBeta: () => false
      }
    };
  });

  describe('<Overview />', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<ComponentWrapper>
        <Overview />
      </ComponentWrapper>);

      expect(asFragment()).toMatchSnapshot();

      expect(screen.getByText('Start your trial')).toHaveAttribute('href', TRIAL_PAGE);
    });

    it('renders correctly on beta', () => {
      global.insights.chrome.isBeta = () => true;

      render(<ComponentWrapper>
        <Overview />
      </ComponentWrapper>);

      expect(screen.getByText('Start your trial')).toHaveAttribute('href', BETA_TRIAL_PAGE);
    });

    it('can open FAQs cards', async () => {
      render(<ComponentWrapper>
        <Overview />
      </ComponentWrapper>);

      userEvent.click(screen.getByText(trialMessages.faq5a.defaultMessage));

      expect(screen.getByText(trialMessages.faq5b.defaultMessage)).toBeVisible();

      userEvent.click(screen.getByText(trialMessages.faq5a.defaultMessage));

      expect(screen.getByText(trialMessages.faq5b.defaultMessage)).not.toBeVisible();
    });
  });

  describe('<Success />', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<ComponentWrapper>
        <Success />
      </ComponentWrapper>);

      expect(asFragment()).toMatchSnapshot();
    });

    it('starts download', () => {
      // eslint-disable-next-line no-import-assign
      downloadTrial.default = jest.fn();

      render(<ComponentWrapper>
        <Success />
      </ComponentWrapper>);

      userEvent.click(screen.getByText('Start your download'));

      expect(downloadTrial.default).toHaveBeenCalled();
    });
  });

  it('<Expired /> renders correctly', () => {
    const { asFragment } = render(<ComponentWrapper>
      <Expired />
    </ComponentWrapper>);

    expect(asFragment()).toMatchSnapshot();
  });
});
