import React from 'react';
import LoginForm from './LoginForm'
import { Card, Grid } from '@mui/material';
import RegistrationForm from './RegistrationForm'

const Connection = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          height: '100vh', // גובה המסך כולו
          alignItems: 'center', // ממרכז אנכית
          justifyContent: 'center' // ממרכז אופקית
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}> {/* אפשר לשנות את הגדלים לפי הצורך */}
          <Card sx={{ minWidth: 275, maxWidth: 275, padding: 4, m: 'auto' }} elevation={12}>
            <LoginForm />
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          height: '100vh', // גובה המסך כולו
          alignItems: 'center', // ממרכז אנכית
          justifyContent: 'center' // ממרכז אופקית
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}> {/* אפשר לשנות את הגדלים לפי הצורך */}
          <Card sx={{ minWidth: 275, maxWidth: 275, padding: 4 }}>
            <RegistrationForm />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Connection;
