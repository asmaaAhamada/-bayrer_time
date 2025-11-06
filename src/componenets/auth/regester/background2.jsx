import React from 'react';
import hand from '../../../assets/images/image.png';
import { Box } from '@mui/material';
import Singhn_Up from './sighn_up';

export default function SignUp() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${hand})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      < Singhn_Up/>
    </Box>
  );
}
