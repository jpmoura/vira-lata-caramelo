import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import AppRoute from '../../../routes/route';
import { AppDrawerProps } from './types';

export default function AppDrawer({ open, onClose }: AppDrawerProps): JSX.Element {
  const history = useHistory();
  const location = useLocation();

  function handleClick(route: AppRoute): void {
    history.push(route);
    onClose();
  }

  function isRoute(route: AppRoute): boolean {
    return location.pathname === route;
  }

  function handleAboutClick(): void {
    window.electron.externalApi.open('https://github.com/jpmoura/vira-lata-caramelo');
  }

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box>
        <List component='nav' subheader={<ListSubheader>Menu</ListSubheader>}>
          <ListItemButton selected={isRoute(AppRoute.Home)} onClick={() => handleClick(AppRoute.Home)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              Início
            </ListItemText>
          </ListItemButton>
          <ListItemButton selected={isRoute(AppRoute.Settings)} onClick={() => handleClick(AppRoute.Settings)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>
              Configurações
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleAboutClick}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>
              Sobre
            </ListItemText>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
