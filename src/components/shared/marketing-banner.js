import './marketing-banner.scss';

import { PageSection } from '@patternfly/react-core';
import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const MarketingBanner = ({ className, hasGraphic, graphicRight, light1000, fullBleed, style, children }) => {

  const MarketingBannerSectionClasses = classNames(
    className,
    'ins-c-marketing-banner',
    { [`ins-m-with-graphic `]: hasGraphic },
    { [`ins-m-graphic-right`]: graphicRight },
    { [`ins-m-light-1000 pf-m-light-1000`]: light1000 },
    { [`ins-m-full-bleed`]: fullBleed }
  );

  return <PageSection
    className={ MarketingBannerSectionClasses }
    style={ style }
    isWidthLimited>
    { children }
  </PageSection>;
};

export default MarketingBanner;

MarketingBanner.propTypes = {
  children: propTypes.any.isRequired,
  className: propTypes.string,
  style: propTypes.any,
  graphicRight: propTypes.bool,
  hasGraphic: propTypes.bool,
  light1000: propTypes.bool,
  fullBleed: propTypes.bool,
  isWidthLimited: propTypes.bool
};
