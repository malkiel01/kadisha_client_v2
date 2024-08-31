import { Box, Typography } from '@mui/material';
import React from 'react';

const useOptionsClients = (dataCustomers = []) => {
  const options = dataCustomers.map(item => ({
    value: item.id,
    label: `${item.firstName} ${item.lastName}`,
    list: (
      <Box sx={{ borderBottom: '1px solid #ddd', width: '100%' }}>
        <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0 }}>
          {`${item.firstName} ${item.lastName}`}
        </Typography>
        <Typography variant="body2" color="textSecondary"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
          <strong>זיהוי:{` ${item.numId}`}</strong>
        </Typography>
      </Box>
    ),
    searchFields: `${item.firstName} ${item.lastName} ${item.numId}`,
  }));

  return options;
};

export default useOptionsClients;
