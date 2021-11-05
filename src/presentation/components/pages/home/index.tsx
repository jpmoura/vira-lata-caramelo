import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useInterval } from 'usehooks-ts';
import RealEstate from '../../../../domain/models/real-estate';
import RealEstateService from '../../../../services/real-estate-service';
import FixedFab from '../../atoms/fixed-fab';
import RealEstateList from '../../organisms/real-estate-list';
import DefaultTemplate from '../../templates/default';
import CronService from '../../../../services/cron-service';

const realEstateService = new RealEstateService();
const cronService = new CronService();

export default function HomePage(): JSX.Element {
  const [realEstates, setRealEstates] = useState<Array<RealEstate>>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadPersistedRealEstates(): Promise<void> {
    setIsLoading(true);

    const persistedRealEstates = await realEstateService.list();
    setRealEstates(persistedRealEstates);
    setIsLoading(false);
  }

  useEffect(() => {
    loadPersistedRealEstates();
    cronService.start();
  }, []);

  useInterval(() => loadPersistedRealEstates, 1000);

  return (
    <DefaultTemplate pageTitle="Início">
      <FixedFab color="primary" disabled={isLoading} onClick={loadPersistedRealEstates}><RefreshIcon /></FixedFab>
      <RealEstateList realEstates={realEstates} />
    </DefaultTemplate>
  );
}
