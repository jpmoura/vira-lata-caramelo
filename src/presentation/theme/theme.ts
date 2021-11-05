import { createTheme } from '@mui/material';
import { background, primary } from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    background: {
      default: background,
    },
  },
});

export default theme;
