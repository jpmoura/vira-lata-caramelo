import { styled } from '@mui/system';
import { Fab } from '@mui/material';

const FixedFab = styled(Fab)({
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  zIndex: 10000,
});

export default FixedFab;
