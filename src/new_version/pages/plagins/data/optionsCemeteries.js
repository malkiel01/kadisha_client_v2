import { Box, Typography, MenuItem } from '@mui/material';

const getEntityByAttr = (data = [], nameAttr = '', attr) => {
  return data?.find(entity => entity[nameAttr] === attr);
};

const optionsCemeteries = (dataCemeteries, selectAll = false) => {
  const clearOption = {
    value: '',
    label: 'הכל',
    list: (
      <Box component="div">
        <em>הכל</em>
      </Box>
    ),
    searchFields: 'הכל',
  };

  const mappedOptions = dataCemeteries.map(item => ({
    value: item.id,
    label: `${item.cemeteryNameHe}`,
    list: (
      <Box sx={{ borderBottom: '1px solid #ddd', width: '100%' }}>
        <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0 }}>
          {`${item.cemeteryNameHe}`}
        </Typography>
        <Typography variant="body2" color="textSecondary"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
          {/* <strong>בית עלמין:</strong>{` ${getEntityByAttr(dataCemeteries, 'id', item?.cemeteryId)?.cemeteryNameHe}`} */}
        </Typography>
      </Box>
    ),
    searchFields: `${item.cemeteryNameHe} ${item.cemeteryNameEn}`,
  }));

  if (selectAll) {
    return [clearOption, ...mappedOptions];
  } else {
    return [...mappedOptions];
  }
};

export default optionsCemeteries;
