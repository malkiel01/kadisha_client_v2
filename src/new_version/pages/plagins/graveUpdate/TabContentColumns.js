import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const TabContentColumns = ({ columns }) => {
  return (
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      {columns.map((column, index) => (
        <Grid item xs={4} key={index}>
          <Box sx={{ textAlign: 'left' }}>
            <Typography color="textSecondary">
              <span style={{ fontWeight: 'bold' }}>{column?.title}</span><span>{`: `}</span>
              <span>{column?.value}</span>
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TabContentColumns;
