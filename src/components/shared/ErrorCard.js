import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';

import { Card, Title, EmptyState, EmptyStateBody, EmptyStateIcon, CardTitle } from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import InfoCircleIcon from '@patternfly/react-icons/dist/js/icons/info-circle-icon';

const Br = () => <br />;

const ErrorCard = ({ appName }) => {

  const intl = useIntl();

  return (
    <Card className='ins-c-dashboard__card'>
      <CardTitle className="pf-u-py-sm">
        { appName }
      </CardTitle>
      <EmptyState variant={ 'full' } className='ins-c-dashboard__error-state'>
        <div>
          <EmptyStateIcon icon={ InfoCircleIcon }  color={ 'red' } />
        </div>
        <Title headingLevel="h2" size="md"> { intl.formatMessage(messages.errorStateTitle) } </Title>
        <EmptyStateBody className='ins-c-dashboard__error-state--body'>
          { intl.formatMessage(messages.errorStateDescription, { supportLink: <a href={ 'https://access.redhat.com/support' }>Red Hat support</a>,
            statusLink: <a href={ 'https://status.redhat.com' }> status</a>, br: Br }) }
        </EmptyStateBody>
      </EmptyState>
    </Card>
  );
};

ErrorCard.propTypes = {
  appName: PropTypes.string
};

export default ErrorCard;
