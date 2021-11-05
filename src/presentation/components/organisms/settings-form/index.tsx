import React, { useEffect, useState } from 'react';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import { Button, Grid, InputAdornment, Paper, Skeleton, TextField, Tooltip, Typography } from '@mui/material';
import { FormikContextType, useFormik } from 'formik';
import * as yup from 'yup';
import { ptShort } from 'yup-locale-pt';
import AppSettings from '../../../../domain/models/app-settings';
import MapSettings from '../../../../domain/models/map-settings';
import CronService from '../../../../services/cron-service';
import NotificationService from '../../../../services/notification-service';
import SettingsService from '../../../../services/settings-service';
import GoogleMaps from '../../molecules/google-maps';
import LazyInput from '../../molecules/lazy-input';

const settingsService = new SettingsService();
const notificationService = new NotificationService();
const cronService = new CronService();

yup.setLocale(ptShort);

const validationSchema = yup.object().shape({
  rentalMaxValue: yup.number().positive().required(),
  rooms: yup.number().positive().required(),
});

export default function SettingsForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [originalSettings, setOriginalSettings] = useState<AppSettings>({});
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(undefined);
  const [mapSettings, setMapSettings] = useState<MapSettings>();

  async function handleOnSubmit(values: AppSettings): Promise<void> {
    try {
      await settingsService.upsert({
        ...values,
        map: mapSettings,
      });
      await cronService.start();
      notificationService.success('Configurações de busca atualizadas');
    } catch (e) {
      console.error(e);
      notificationService.error('Erro ao tentar atualizar as configurações de busca');
    }
  }

  const formik: FormikContextType<AppSettings> = useFormik({
    initialValues: {
      rentalMaxValue: null,
      rooms: null,
    } as AppSettings,
    validateOnMount: true,
    validationSchema,
    onSubmit: handleOnSubmit,
  });
  const canSubmitForm = Object.keys(formik.errors).length === 0 && formik.dirty;

  function handleOnClickCancel(): void {
    formik.resetForm();
    formik.setValues(originalSettings);
  }

  useEffect(() => {
    async function getSettings(): Promise<void> {
      const settings = await settingsService.get(true);
      setOriginalSettings(settings);
      formik.setValues(settings);
      setIsLoading(false);
    }

    getSettings();
  }, []);

  function updateMapSettings(newMapSettings: MapSettings): void {
    setMapSettings(newMapSettings);
  }

  useEffect(() => {
    if (Object.keys(originalSettings).length === 0) {
      return;
    }

    const coordinates = originalSettings.map?.coordinates;

    if (coordinates) {
      setMapCenter({
        lat: (coordinates.north + coordinates.south) / 2,
        lng: (coordinates.west + coordinates.east) / 2,
      });
    }
  }, [originalSettings]);

  return (
    <Paper sx={{ padding: '20px' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12}>
            <LazyInput
              isLoading={isLoading}
              input={
                <TextField
                  name="rentalMaxValue"
                  type="number"
                  autoFocus
                  label="Valor máximo de custo total"
                  placeholder="Exemplo: 2500"
                  fullWidth
                  value={formik.values.rentalMaxValue}
                  error={!!formik.errors.rentalMaxValue}
                  onChange={formik.handleChange}
                  helperText={formik.errors.rentalMaxValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>R$</Typography>
                      </InputAdornment>
                    ),
                  }}
                />}
            />
          </Grid>
          <Grid item xs={12}>
            <LazyInput
              isLoading={isLoading}
              input={
                <TextField
                  name="rooms"
                  label="Quantidade de quartos"
                  type="number"
                  placeholder="Exemplo: 2"
                  fullWidth
                  value={formik.values.rooms}
                  error={!!formik.errors.rooms}
                  onChange={formik.handleChange}
                  helperText={formik.errors.rooms}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BedroomChildIcon />
                      </InputAdornment>
                    ),
                  }}
                />}
            />
          </Grid>
          <Grid item container xs={12} direction="row" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Área de busca</Typography>
            </Grid>
            <Grid item xs={12}>
              {isLoading ? <Skeleton sx={{ width: '100%', height: '400px' }} /> : <GoogleMaps center={mapCenter} updateMapSettings={updateMapSettings} />}
            </Grid>
          </Grid>
          <Grid item container xs={12} direction="row" spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                type="reset"
                color="warning"
                onClick={handleOnClickCancel}
                fullWidth
              >
                Limpar
              </Button>
            </Grid>
            <Grid item xs={6} >
              <Tooltip title="Faça uma alteração válida para salvar as configurações">
                <span>
                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    disabled={!canSubmitForm}
                    fullWidth
                  >
                    Salvar
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
