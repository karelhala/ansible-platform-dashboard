/* eslint camelcase: 0 */
import { stringify } from 'query-string';
import { getAxiosInstance } from '../shared/user-login';
import { setAnalyticsAvailability, setAnalyticsError } from '../../redux/actions/analytics-actions';
/* v0 endpoints */
const clustersEndpoint = `/api/tower-analytics/v0/clusters/`;
const notificationsEndpoint = `/api/tower-analytics/v0/notifications/`;

/* v1 endpoints */
const jobExplorerEndpoint = '/api/tower-analytics/v1/job_explorer/';

const axiosInstance = getAxiosInstance();

function authenticatedFetch(endpoint, options) {
  return window.insights.chrome.auth.getUser().then(() => axiosInstance.get(endpoint, options)).catch((err) => {
    if (err.status === 404) {
      setAnalyticsAvailability(false);
    }
    else {
      setAnalyticsError(true);
    }}
  );;
}

export const getJobsData = () => {
  const params = {
    status: [ 'successful', 'failed' ],
    quick_date_range: 'last_30_days',
    job_type: [ 'workflowjob', 'job' ],
    group_by_time: true,
    org_id: [],
    cluster_id: [],
    template_id: [],
    only_root_workflows_and_standalone_jobs: false,
    limit: 1,
    offset: 0
  };
  const qs = stringify(params);
  const url = new URL(jobExplorerEndpoint, window.location.origin);
  url.search = qs;
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

// v0 endpoints used in Notifications.js
export const getClusters = () => {
  return authenticatedFetch(clustersEndpoint);
};

export const getNotifications = (severity = 'error') => {
  const url = new URL(notificationsEndpoint, window.location.origin);
  url.searchParams.append('severity', severity);
  return authenticatedFetch(url);
};
