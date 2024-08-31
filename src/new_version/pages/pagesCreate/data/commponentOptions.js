import React from 'react';
import { Box, Typography } from '@mui/material';

export const CommponentOptions = ({ value = -1, label = '', dataUnderRigth = null, dataUnderLeft = null, searchFields = null }) => {
  if (value === '') {
    value = -1;
    label = 'הכל';
  }

  return {
    value: value,
    label: label,
    list: (
      <Box sx={{ borderBottom: '1px solid #ddd', width: '100%' }}>
        <Typography variant="body1" color="textPrimary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0 }}>
          {label}
        </Typography>
        {(dataUnderRigth || dataUnderLeft) && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {dataUnderRigth && (
              <Typography variant="body2" color="textSecondary"
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
                <strong>{dataUnderRigth?.title}</strong>{dataUnderRigth?.value}
              </Typography>
            )}
            {dataUnderLeft && (
              <Typography variant="body2" color="textSecondary"
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, padding: 0, fontSize: 12, letterSpacing: 0 }}>
                <strong>{dataUnderLeft?.title}</strong>{dataUnderLeft?.value}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    ),
    searchFields: searchFields ? searchFields : `${label} ${dataUnderRigth?.value || ''} ${dataUnderLeft?.value || ''}`,
  };
};

// export const getFieldOptions = (fieldName, optionsFields, all = false) => {
//   const field = optionsFields.find(option => option.field === fieldName);
//   if (field) {
//     const options = field.values.map(item => CommponentOptions({ value: item.value, label: item.name }));
//     if (all) {
//       options.unshift(CommponentOptions({ value: '', label: '' }));
//     }
//     return options;
//   }
//   return [];
// };


export default CommponentOptions;
