import { Box, Typography, MenuItem } from '@mui/material';

const getEntityByAttr = (data = [], nameAttr = '', attr) => {
  return data?.find(entity => entity[nameAttr] === attr);
};

const optionsPlots = (dataPlots, dataBlocks, dataCemeteries, selectAll = false) => {
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

  if (selectAll) {
    return [clearOption, ...mappedOptions];
  } else {
    return [...mappedOptions];
  }
};

export default optionsPlots;
