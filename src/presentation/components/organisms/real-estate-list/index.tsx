import { Grid } from '@mui/material';
import React from 'react';
import EmptyState from '../../molecules/empty-state-paper';
import RealEstateCard from '../../molecules/real-estate-card';
import { RealEstateListProps } from './types';

export default function RealEstateList({ realEstates }: RealEstateListProps): JSX.Element {
  function getRealEstateCards(): JSX.Element {
    return <Grid container spacing={2} padding={2}>
      {realEstates.map((realEstate) => <Grid item key={realEstate.id}><RealEstateCard realEstate={realEstate} /></Grid>)}
    </Grid>;
  }

  return (
    <>
      { realEstates.length === 0 ? <EmptyState /> : getRealEstateCards() }
    </>
  );
}
