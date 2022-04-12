import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import UserContext from '../../../user-context';

import Overview from '../../../components/trial/overview';
import Success from '../../../components/trial/success';
import Expired from '../../../components/trial/expired';
import trialMessages from '../../../messages/trial.messages';

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
  describe('<Overview />', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<ComponentWrapper>
        <Overview />
      </ComponentWrapper>);

      expect(asFragment()).toMatchSnapshot();
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

  it('<Success /> renders correctly', () => {
    const { asFragment } = render(<ComponentWrapper>
      <Success />
    </ComponentWrapper>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('<Expired /> renders correctly', () => {
    const { asFragment } = render(<ComponentWrapper>
      <Expired />
    </ComponentWrapper>);

    expect(asFragment()).toMatchSnapshot();
  });
});
