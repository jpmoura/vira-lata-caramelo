import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GarageIcon from '@mui/icons-material/Garage';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import IconGrid from '../../atoms/icon-grid';
import { RealEstateCardProps } from './types';
import RealEstateProvider from '../../../../domain/enum/real-estate-provider';

function getProviderImage(provider: RealEstateProvider): string {
  if (provider === RealEstateProvider.QuintoAndar) {
    return 'https://pbs.twimg.com/profile_images/1057395432404500480/besRnQbV.jpg';
  }

  return '';
}

export default function RealEstateCard({ realEstate }: RealEstateCardProps): JSX.Element {
  function handleOnClick() {
    window.electron.externalApi.open(realEstate.url);
  }

  const title = `${realEstate.type} em ${realEstate.regionName}`;
  const avatarImage = getProviderImage(realEstate.provider);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={avatarImage} alt={realEstate.provider} />
        }
        title={title}
        subheader={realEstate.address}
      />
      <CardMedia component="img" height="300" image={realEstate.coverImage} alt="Imagem do imóvel" />
      <CardContent>
        <Grid container>
          <Grid item container xs={12} direction="row" justifyContent="space-between">
            <IconGrid item>
              <AttachMoneyIcon />
              <Typography alignContent="center">
                {realEstate.totalCost},00
              </Typography>
            </IconGrid>
            <IconGrid item>
              <SquareFootIcon />
              <Typography>
                {realEstate.area}m²
              </Typography>
            </IconGrid>
            <IconGrid item>
              <MeetingRoomIcon />
              <Typography>
                {realEstate.bedrooms}
              </Typography>
            </IconGrid>
            <IconGrid item>
              <GarageIcon />
              <Typography>
                {realEstate.parkingSpaces}
              </Typography>
            </IconGrid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center">
          <Grid item>
            <Button size="small" color="primary" onClick={handleOnClick}>
              Visualizar no site
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
