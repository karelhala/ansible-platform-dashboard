[![Build Status](https://travis-ci.org/RedHatInsights/ansible-platform-dashboard.svg?branch=master)](https://travis-ci.org/RedHatInsights/ansible-platform-dashboard)

# ansible-platform-dashboard

Dashboard app for the RedHat Ansible Automation Plaform 

## Getting Started

You'll need to clone:

- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)
- RedHat ansible automation platform dashboard (this repo)

1. Run [insights-proxy](https://github.com/RedHatInsights/insights-proxy) (requires [Docker](https://www.docker.com/) and modifying /etc/hosts). It's recommended to set a PROXY_PATH environment variable in your .bashrc to avoid having to write the full path to where you clone the repo.

```shell
SPANDX_CONFIG="./profiles/local-frontend.js" bash $PROXY_PATH/scripts/run.sh
```

2. ```npm install```

3. ```npm run start```

4. Open one of the following environments behind the Red Hat VPN and accept the certs:
  - https://ci.foo.redhat.com:1337/beta/ansible/dashboard
  - https://qa.foo.redhat.com:1337/beta/ansible/dashboard
  - https://stage.foo.redhat.com:1337/beta/ansible/dashboard
  - https://prod.foo.redhat.com:1337/beta/ansible/dashboard


### Testing

`npm run verify` will run `npm run lint` (eslint) and `npm test` (Jest)

## Deploying

- The ansible automation platform dashboard repo uses Travis to deploy the webpack build to another Github repo defined in `.travis.yml`
  - That Github repo has the following branches:
    - `ci-beta` (deployed by pushing to `master` or `main` on this repo)
    - `ci-stable` (deployed by pushing to `ci-stable` on this repo)
    - `prod-beta` (deployed by pushing to `prod-beta` on this repo)
    - `prod-stable` (deployed by pushing to `prod-stable` on this repo)
- Travis uploads results to RedHatInight's [codecov](https://codecov.io) account. To change the account, modify CODECOV_TOKEN on https://travis-ci.com/.

