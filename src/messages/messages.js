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
  totalClusters: {
    id: 'analytics.clusters',
    defaultMessage: 'totalClusters'
  },
  critical: {
    id: 'analytics.critical',
    defaultMessage: 'Critical'
  },
  warning: {
    id: 'analytics.warning',
    defaultMessage: 'Warning'
  },
  catalogTitle: {
    id: 'catalog.title',
    defaultMessage: 'Automation Services Catalog'
  },
  catalogCardDescription: {
    id: 'catalog.description',
    defaultMessage: 'Collect and distribute automation content, govern content by approval processes and assure sign-off by assigned groups.'
  },
  products: {
    id: 'catalog.products',
    defaultMessage: 'Products'
  },
  portfolios: {
    id: 'catalog.portfolios',
    defaultMessage: 'Portfolios'
  },
  platforms: {
    id: 'catalog.platforms',
    defaultMessage: 'Platforms'
  },
  latestOrderTitle: {
    id: 'catalog.latestOrder',
    defaultMessage: 'Latest orders'
  },
  hubTitle: {
    id: 'hub.title',
    defaultMessage: 'Automation Hub'
  },
  hubCardDescription: {
    id: 'hub.description',
    defaultMessage: 'Find and use content that is supported by Red Hat and our partners to deliver reassurance for the most demanding environments'
  },
  partners: {
    id: 'hub.partners',
    defaultMessage: 'Partners'
  },
  collections: {
    id: 'hub.collections',
    defaultMessage: 'Collections'
  },
  syncCollections: {
    id: 'hub.syncCollections',
    defaultMessage: 'Collections set to sync'
  }
});

export default messages;
