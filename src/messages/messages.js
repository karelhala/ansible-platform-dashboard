import { defineMessages } from 'react-intl';

const messages = defineMessages({
  errorStateTitle: {
    id: 'error.state.title',
    defaultMessage: 'Something went wrong'
  },
  errorStateDescription: {
    id: 'error.state.description',
    defaultMessage:
    // eslint-disable-next-line max-len
      'There was a problem processing the request. Please try again. <br></br> If the problem persists, contact {supportLink} or check our {statusLink} page for known outages.'
  },
  analyticsTitle: {
    id: 'analytics.title',
    defaultMessage: 'Insights Analytics'
  },
  analyticsCardDescription: {
    id: 'analytics.description',
    defaultMessage: 'Gain insights into your deployments through visual dashboards and organization statistics calculate ' +
        'your return on investment and explore automation processes details.'
  },
  catalogTitle: {
    id: 'catalog.title',
    defaultMessage: 'Automation Services Catalog'
  },
  catalogCardDescription: {
    id: 'catalog.description',
    defaultMessage: 'Collect and distribute automation content, govern content by approval processes and assure sin-off by assigned groups.'
  },
  hubTitle: {
    id: 'hub.title',
    defaultMessage: 'Automation Hub'
  },
  hubCardDescription: {
    id: 'hub.description',
    defaultMessage: 'Find and use content that is supported by Red Hat and our partners to deliver reassurance for the most demanding environments'
  }
});

export default messages;
