import React from 'react';
import hand from '../../../assets/images/image.png';
import { Box } from '@mui/material';
import Login_page from './login';

export default function Login() {
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
      <Login_page />
    </Box>
  );
}
