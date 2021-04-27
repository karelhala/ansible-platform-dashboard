/* eslint-disable react/prop-types */
import React from 'react';
import { Skeleton } from '@redhat-cloud-services/frontend-components/Skeleton';

const AppPlaceholder = () => {
  return (
    <React.Fragment>
      <Skeleton size="md" />
      <br />
      <Skeleton size="md" />
    </React.Fragment>
  );
};

export const IconPlaceholder = ({
  height
}) => (
  <svg height={ height } width={ height }>
    <circle cx={ height / 2 } cy={ height / 2 } r={ height / 2 } fill="#ecebeb" />
  </svg>
);
export default AppPlaceholder;
