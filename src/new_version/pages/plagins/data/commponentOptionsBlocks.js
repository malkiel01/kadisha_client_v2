import React from 'react';
import { Box, Typography } from '@mui/material';

const getEntityByAttr = (data = [], nameAttr = '', attr) => {
  return data?.find(entity => entity[nameAttr] === attr);
};

const OptionsBlocks = ({ dataBlocks, dataCemeteries, selectAll = false }) => {
  const clearOption = {
    value: '',
    label: 'הכל',
    list: (
      <Box>
        <em>הכל</em>
      </Box>
    ),
    searchFields: 'הכל',
  };

  const mappedOptions = dataBlocks.map(item => ({
    value: item.id,
    label: `${item.blockNameHe}`,
    list: (
      <Box sx={{ borderBottom: '1px solid #ddd', width: '100%' }}>
        <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0 }}>
          {`${item.blockNameHe}`}
        </Typography>
        <Typography variant="body2" color="textSecondary"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
          <strong>בית עלמין:</strong>{` ${getEntityByAttr(dataCemeteries, 'id', item?.cemeteryId)?.cemeteryNameHe}`}
        </Typography>
      </Box>
    ),
    searchFields: `${item.blockNameHe} ${item.blockNameEn}`,
  }));

  const options = selectAll ? [clearOption, ...mappedOptions] : mappedOptions;

  return (
    <div>
      {options.map(option => (
        <div key={option.value}>
          {option.list}
        </div>
      ))}
    </div>
  );
};

export default OptionsBlocks;
