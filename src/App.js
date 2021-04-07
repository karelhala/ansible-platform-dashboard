import React, { useState, useEffect, Suspense } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { Routes } from './Routes';
// react-int eng locale data
import { IntlProvider } from 'react-intl';

import './App.scss';
import AppPlaceholder from './components/shared/loader-placeholders';

const pathName = window.location.pathname.split('/');

pathName.shift();

const App = () => {
  const [ auth, setAuth ] = useState(false);

  useEffect(() => {
    insights.chrome.init();
    insights.chrome.auth.getUser().then(() => setAuth(true));
    insights.chrome.identifyApp('ansible-dashboard');
  }, []);

  if (!auth) {
    return <AppPlaceholder />;
  }

  return (
    <Suspense fallback={ <AppPlaceholder /> }>
      <IntlProvider locale="en">
        <React.Fragment>
          <NotificationsPortal />
          <Main className="pf-u-p-0 pf-u-ml-0">
            <Routes />
          </Main>
        </React.Fragment>
      </IntlProvider>
    </Suspense>
  );
};

export default App;
