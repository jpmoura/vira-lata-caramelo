import React from 'react';
import { Skeleton } from '@mui/material';
import { LazyInputProps } from './types';

export default function LazyInput({ isLoading, input }: LazyInputProps): JSX.Element {
  return isLoading ? <Skeleton height="76.5px" /> : input;
}
