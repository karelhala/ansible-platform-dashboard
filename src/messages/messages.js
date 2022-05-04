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
    defaultMessage: 'Insights Ansible Automation Platform'
  },
  analyticsCardDescription: {
    id: 'analytics.description',
    defaultMessage: 'Gain insights into your deployments through visual dashboards and organization statistics calculate ' +
        'your return on investment and explore automation processes details.'
  },
  analyticsJobTitle: {
    id: 'analytics.jobs.title',
    defaultMessage: 'Job status'
  },
  analyticsCardNotificationsTitle: {
    id: 'analytics.notifications.title',
    defaultMessage: 'Notifications'
  },
  totalClusters: {
    id: 'analytics.total.clusters',
    defaultMessage: 'Total clusters'
  },
  jobsExplorer: {
    id: 'analytics.jobs.explorer',
    defaultMessage: 'View Job Explorer'
  },
  timeDayLegend: {
    id: 'analytics.time.day.legend',
    defaultMessage: 'Time: Day'
  },
  jobsAcrossClusters: {
    id: 'analytics.jobs.across.clusters',
    defaultMessage: 'Jobs across clusters'
  },
  clusterTitle: {
    id: 'analytics.clusters.title',
    defaultMessage: 'Clusters'
  },
  critical: {
    id: 'analytics.critical',
    defaultMessage: 'Critical'
  },
  warning: {
    id: 'analytics.warning',
    defaultMessage: 'Warnings'
  },
  hubTitle: {
    id: 'hub.title',
    defaultMessage: 'Automation Hub'
  },
  noOrdersTitle: {
    id: 'noOrders.title',
    defaultMessage: 'No orders yet'
  },
  noOrdersDescription: {
    id: 'noOrdersDescription',
    defaultMessage: 'Orders show up here when an order is placed.'
  },
  hubCardDescription: {
    id: 'hub.description',
    defaultMessage: 'Find and use content that is supported by Red Hat and our partners to deliver reassurance for the most demanding environments'
  },
  hubCardCertifiedCollectionTitle: {
    id: 'hub.certified.title',
    defaultMessage: 'Certified Ansible Collections'
  },
  hubCardCertifiedCollectionDescription: {
    id: 'hub.certified.description',
    defaultMessage: 'View Ansible Content Collections certified and supported by Red Hat. ' +
        'Download collections or sync them to your local repositories.'
  },
  hubCardFeaturedCollectionTitle: {
    id: 'hub.featured.title',
    defaultMessage: 'Featured collection'
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
  },
  syncCollectionsTooltip: {
    id: 'hub.syncCollectionsTooltip',
    defaultMessage: 'This is the number of collections that your organization will sync if you have connected to Private Hub.'
  },

  modules: {
    id: 'hub.modules',
    defaultMessage: 'Modules'
  },
  roles: {
    id: 'hub.roles',
    defaultMessage: 'Roles'
  },
  plugins: {
    id: 'hub.plugins',
    defaultMessage: 'Plugins'
  },
  overview: {
    id: 'ansible.overview',
    defaultMessage: 'Overview'
  },
  noAppTitle: {
    id: 'no.app.title',
    defaultMessage: 'Get started with Red Hat Ansible Automation Platform'
  },
  noAppDescription: {
    id: 'no.app.description',
    defaultMessage: 'Red Hat Ansible Automation Platform simplifies the development and operation of automation' +
        ' workloads across diverse hybrid environments using the Automation Controller, certified and supported content' +
        ' collections, and the hosted services on cloud.redhat.com'
  },
  configureLink: {
    id: 'configure.button',
    defaultMessage: 'Install and configure your infrastructure'
  },
  tryItButton: {
    id: 'try.it.button',
    defaultMessage: 'Try it free'
  },
  learnMoreButton: {
    id: 'learn.more.button',
    defaultMessage: 'Learn more'
  },
  configDescription: {
    id: 'config.description',
    defaultMessage: 'Install and configure your Ansible Automation Controller clusters. Once your Ansible Automation ' +
        'Controller infrastructure is in place, connect it to the hosted services available on cloud.redhat.com.' +
        'Learn how connect to each service in the tiles below.'
  },
  configureAnalyticsTitle: {
    id: 'configure.analytics.title',
    defaultMessage: 'Connect Insights for Ansible Automation Platform'
  },
  configureAnalyticsDescription: {
    id: 'configure.analytics.description',
    defaultMessage: 'Gain insights into your deployments through visual dashboards and organization statistics, ' +
        'calculate your return on investment, and explore automation processes details'
  },
  viewMore: {
    id: 'labels.view.more',
    defaultMessage: 'View more'
  },
  configureAnalyticsLink: {
    id: 'configure.analytics.link',
    defaultMessage: 'Configure Insights Ansible Automation Platform'
  }
});

export default messages;
