import React from 'react';
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  PlusCircleIcon
} from '@patternfly/react-icons';

const orderStatusMapper = {
  Completed: { icon: <CheckCircleIcon />, color: 'green' },
  'Approval Pending': {
    icon: <ClockIcon />,
    color: 'blue'
  },
  Ordered: { icon: <PlusCircleIcon />, color: 'grey' },
  Failed: { icon: <ExclamationCircleIcon />, color: 'red' },
  Canceled: { icon: <ExclamationTriangleIcon />, color: 'orange' },
  Created: { icon: <PlusCircleIcon />, color: 'grey' },
  Approved: { icon: <CheckCircleIcon />, color: 'green' },
  Denied: { icon: <ExclamationCircleIcon />, color: 'red' },
  Error: { icon: <ExclamationCircleIcon />, color: 'red' },
  Undecided: {
    icon: <ClockIcon />,
    color: 'blue'
  },
  Unknown: { icon: <ExclamationTriangleIcon />, color: 'grey' }
};

export default orderStatusMapper;
