import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const NotConnected = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" align="center">
          טרם אושר כניסה למשתמש
        </Typography>
      </Box>
    </Container>
  );
};

export default NotConnected;
