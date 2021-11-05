import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AppDrawer from '../../molecules/drawer';
import { DefaultTemplateProps } from './types';

function DefaultTemplate({ pageTitle, children }: DefaultTemplateProps): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer(): void {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <Box sx={{
        flexGrow: 1,
        marginBottom: 2,
      }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Vira-lata Caramelo
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <AppDrawer open={isDrawerOpen} onClose={toggleDrawer} />
      <Box sx={{
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
      }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>{pageTitle}</Typography>
        {children}
      </Box>
    </>
  );
}

DefaultTemplate.defaultProps = {
  children: null,
};

export default DefaultTemplate;
