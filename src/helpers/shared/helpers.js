import React from 'react';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';

export const scrollToTop = () =>
  document.getElementById('root')?.scrollTo({
    behavior: 'smooth',
    top: 0,
    left: 0
  });

export const TimeAgo = (date) => (
  <span key={ date }>
    <DateFormat date={ date } type="relative" />
  </span>
);

const sizes = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
export const readableBytes = (bytes) => {
  if (bytes === 0) {
    return 'O B';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Number((bytes / Math.pow(1024, i)).toFixed(2)) * 1} ${sizes[i]}`;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
