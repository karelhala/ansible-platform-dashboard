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

export default AppPlaceholder;
