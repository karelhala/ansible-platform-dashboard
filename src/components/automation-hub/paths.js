
const getQueryString = (params) => {
  const paramString = [];
  for (const key of Object.keys(params)) {

    if (Array.isArray(params[key])) {
      for (const val of params[key]) {
        paramString.push(key + '=' + encodeURIComponent(val));
      }
    } else {
      paramString.push(key + '=' + encodeURIComponent(params[key]));
    }
  }

  return paramString.join('&');
};

export function formatPath(path, data, params = {}) {
  let url = path;

  for (const k of Object.keys(data)) {
    url = url.replace(':' + k + '+', data[k]).replace(':' + k, data[k]);
  }

  if (params) {
    return `${url}?${getQueryString(params)}`;
  } else {
    return url;
  }
}

export const Paths = {
  executionEnvironmentDetailActivities: '/containers/:container+/_content/activity',
  executionEnvironmentDetailImages: '/containers/:container+/_content/images',
  executionEnvironmentDetail: '/containers/:container+',
  executionEnvironments: '/containers',
  executionEnvironmentManifest: '/containers/:container+/_content/images/:digest',
  groupList: '/group-list',
  groupDetail: '/group/:group',
  myCollections: '/my-namespaces/:namespace',
  myNamespaces: '/my-namespaces',
  editNamespace: '/my-namespaces/edit/:namespace',
  myImports: '/my-imports',
  login: '/login',
  logout: '/logout',
  search: '/',
  searchByRepo: '/repo/:repo',
  myCollectionsByRepo: '/repo/:repo/my-namespaces/:namespace',
  collectionByRepo: '/repo/:repo/:namespace/:collection',
  collectionDocsPage: '/:namespace/:collection/docs/:page',
  collectionDocsIndex: '/:namespace/:collection/docs',
  collectionContentDocs: '/:namespace/:collection/content/:type/:name',
  collectionContentList: '/:namespace/:collection/content',
  collectionImportLog: '/:namespace/:collection/import-log',
  collectionDocsPageByRepo: '/repo/:repo/:namespace/:collection/docs/:page',
  collectionDocsIndexByRepo: '/repo/:repo/:namespace/:collection/docs',
  collectionContentDocsByRepo: '/repo/:repo/:namespace/:collection/content/:type/:name',
  collectionContentListByRepo: '/repo/:repo/:namespace/:collection/content',
  collectionImportLogByRepo: '/repo/:repo/:namespace/:collection/import-log',
  namespaceByRepo: '/repo/:repo/:namespace',
  collection: '/:namespace/:collection',
  namespace: '/:namespace',
  partners: '/partners',
  namespaces: '/namespaces',
  notFound: '/not-found',
  token: '/token',
  approvalDashboard: '/approval-dashboard',
  userList: '/users',
  createUser: '/users/create',
  editUser: '/users/:userID/edit',
  userDetail: '/users/:userID',
  userProfileSettings: '/settings/user-profile',
  repositories: '/repositories'
};
