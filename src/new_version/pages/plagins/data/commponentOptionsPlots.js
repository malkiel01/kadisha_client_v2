import React from 'react';
import { Box, Typography } from '@mui/material';

const getEntityByAttr = (data = [], nameAttr = '', attr) => {
  return data?.find(entity => entity[nameAttr] === attr);
};

const OptionsPlots = ({ dataPlots, dataBlocks, dataCemeteries, selectAll = false }) => {
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

  const mappedOptions = dataPlots.map(item => {
    const block = getEntityByAttr(dataBlocks, 'id', item?.blockId);
    const cemetery = getEntityByAttr(dataCemeteries, 'id', block?.cemeteryId);
    return {
      value: item.id,
      label: `${item.plotNameHe}`,
      list: (
        <Box sx={{ borderBottom: '1px solid #ddd', width: '100%' }}>
          <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0 }}>
            {`${item.plotNameHe}`}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" color="textSecondary"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
              <strong>גוש:</strong>{` ${block?.blockNameHe}`}
            </Typography>
            <Typography variant="body2" color="textSecondary"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
              <strong>בית עלמין:</strong>{` ${cemetery?.cemeteryNameHe}`}
            </Typography>
          </Box>
        </Box>
      ),
      searchFields: `${item.plotNameHe} ${item.plotNameEn}`,
    };
  });

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

export default OptionsPlots;
