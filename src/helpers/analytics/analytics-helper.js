/* eslint camelcase: 0 */
import { stringify } from 'query-string';
import {getAxiosInstance} from '../shared/user-login';
/* v0 endpoints */
const clustersEndpoint = `/api/tower-analytics/v0/clusters/`;
const notificationsEndpoint = `/api/tower-analytics/v0/notifications/`;
const preflightEndpoint = `/api/tower-analytics/v0/authorized/`;

/* v1 endpoints */
const jobExplorerEndpoint = '/api/tower-analytics/v1/job_explorer/';
const hostExplorerEndpoint = '/api/tower-analytics/v1/host_explorer/';
const eventExplorerEndpoint = '/api/tower-analytics/v1/event_explorer/';
const ROIEndpoint = '/api/tower-analytics/v1/roi_templates/';

/* page options endpoints */
const jobExplorerOptionsEndpoint =
    '/api/tower-analytics/v1/job_explorer_options/';
const ROITemplatesOptionsEndpoint = '/api/tower-analytics/v1/roi_templates_options/';
const orgOptionsEndpoint = '/api/tower-analytics/v1/dashboard_organization_statistics_options/';
const clustersOptionsEndpoint = '/api/tower-analytics/v1/dashboard_clusters_options/';

const axiosInstance = getAxiosInstance();

function handleResponse(response) {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    }

    if (response.status === 404 || response.status === 401) {
      return Promise.reject({
        status: response.status,
        message: json
      });
    } else if (response.status === 403) {
      return Promise.reject({
        status: response.status,
        error: 'RBAC access denied'
      });
    } else {
      return Promise.reject(json);
    }
  });
}

function authenticatedFetch(endpoint, options) {
  return window.insights.chrome.auth.getUser().then(() => axiosInstance.get(endpoint, options));
}

export const preflightRequest = () => {
  return authenticatedFetch(preflightEndpoint).then(handleResponse);
};

export const getJobsData = () => {
  const paginationParams = {
    limit: 1,
    offset: 0
  };
  const qs = stringify(paginationParams);
  const url = new URL(jobExplorerEndpoint, window.location.origin);
  url.search = qs;
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(paginationParams)
  });
};

export const readEventExplorer = ({ params = {}}) => {
  const { limit, offset, sort_by } = params;
  const paginationParams = {
    limit,
    offset,
    sort_by
  };
  const qs = stringify(paginationParams);
  const url = new URL(eventExplorerEndpoint, window.location.origin);
  url.search = qs;
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
};

export const readROI = ({ params = {}}) => {
  const { limit, offset, sort_by } = params;
  const paginationParams = {
    limit,
    offset,
    sort_by
  };
  const qs = stringify(paginationParams);
  const url = new URL(ROIEndpoint, window.location.origin);
  url.search = qs;
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
};

export const readHostExplorer = ({ params = {}}) => {
  const { limit, offset, sort_by } = params;
  const paginationParams = {
    limit,
    offset,
    sort_by
  };
  const qs = stringify(paginationParams);
  const url = new URL(hostExplorerEndpoint, window.location.origin);
  url.search = qs;
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
};

export const readClustersOptions = ({ params = {}}) => {
  const url = new URL(clustersOptionsEndpoint, window.location.origin);
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
};

export const readOrgOptions = ({ params = {}}) => {
  const url = new URL(orgOptionsEndpoint, window.location.origin);
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
};

export const readROIOptions = ({ params = {}}) => {
  const url = new URL(ROITemplatesOptionsEndpoint, window.location.origin);
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
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

export const readJobExplorerOptions = ({ params = {}}) => {
  const url = new URL(jobExplorerOptionsEndpoint, window.location.origin);
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(handleResponse);
};
