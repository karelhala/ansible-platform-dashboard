import '../../App.scss';
import { Banner, PageSection } from '@patternfly/react-core';
import React from 'react';
import propTypes from 'prop-types';

const DashboardBanner = ({ children }) => {
  return (
    <PageSection>
      <Banner>{ children }</Banner>;
    </PageSection>
  );
};

export default DashboardBanner;

DashboardBanner.propTypes = {
  children: propTypes.any.isRequired
};
