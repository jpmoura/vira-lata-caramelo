import React from 'react';
import { Grid, Typography } from '@mui/material';

export default function EmptyState(): JSX.Element {
  return (
    <Grid container direction="column" alignContent="center" alignItems="center" spacing={4}>
      <Grid item xs={12}>
        <img src="https://httpstatusdogs.com/img/404.jpg" alt="Nenhum imóvel encontrado ainda!" />
      </Grid>
      <Grid item xs={12}>
        <Typography>Opa, ainda não encontrei nada 😣</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Tente modificar os parâmetros de busca na tela de configuração</Typography>
      </Grid>
    </Grid>
  );
}
