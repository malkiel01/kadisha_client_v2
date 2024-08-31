import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import useQueries from '../../../../../database/useQueries';

const OptionsBlocks = ({ dataBlocks = [], dataCemeteries = [], onOptionsChange }) => {
  const { getEntityByAttr } = useQueries();

  useEffect(() => {
    const options = dataBlocks.map(item => ({
      value: item.id,
      label: item.blockNameHe,
      list: (
        <Box sx={{ borderBottom: '1px solid #ddd', width: '100%' }}>
          <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0 }}>
            {`${item.blockNameHe}`}
          </Typography>
          <Typography variant="body2" color="textSecondary"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
            <strong>בית עלמין: {getEntityByAttr(dataCemeteries, 'id', item.cemeteryId)?.cemeteryNameHe}</strong>
          </Typography>
        </Box>
      ),
      searchFields: `${item.blockNameHe} ${getEntityByAttr(dataCemeteries, 'id', item.cemeteryId)?.cemeteryNameHe}`,
    }));

    onOptionsChange(options);
  }, [dataBlocks, dataCemeteries, getEntityByAttr, onOptionsChange]);

  return null; // קומפוננטה זו אינה מחזירה שום JSX
};

export default OptionsBlocks;
