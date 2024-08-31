import React from 'react';
import { Grid, Box, Typography, Card, styled } from '@mui/material';


const CardContentColumns = ({ columns, image }) => {

  const StyledImg = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  });

  return (
    <Grid container
      spacing={2}
      style={{
        margin: 0,
        marginTop: '20px',
        width: '100%'
      }}>
      <Card sx={{width: '100%', paddingTop: 2, paddingBottom: 2}}>
        <Grid container spacing={2}
          columns={16}
        >
          <Grid
            item
            xs={8}
            sx={{
              textAlign: 'left', width: '100%',
            }}
          >
            <Grid item xs={12} sx={{ width: '100%', textAlign: 'left' }}>
              <Box sx={{ width: '100%', textAlign: 'left', paddingLeft: 10 }}>
                {columns?.map((row, index) => (
                  (index > 0) &&
                  <Typography key={index} color="textSecondary" sx={{ width: '100%', marginTop: 1.6, display: 'block' }}>
                    <span style={{ fontWeight: 'bold' }}>{row?.title}</span><span>{`: `}</span>
                    <span>{row?.value}</span>
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              textAlign: 'left', width: '100%',
            }}
          >
            <Card sx={{
              width: 240,
              height: 320,
            }}>
              <StyledImg
                src={`https://mbe-plus.com/kadisha_v1/kadisha_1/gravesImages/${image}.jpg`}
                alt="Description of Image"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CardContentColumns;
