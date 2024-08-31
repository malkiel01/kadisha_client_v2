import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText } from '@mui/material';
import useStyles from '../useStylesOld';

const SelectComponent = ({ field, value, handleChange, error, options }) => {
  const classes = useStyles();
  const isDisabled = field.disabled || field.lock;

  return (
    <Box className={classes.textFieldContainer}>
      <FormControl fullWidth error={!!error}>
        <InputLabel>{field.label}</InputLabel>
        <Select
          name={field.name}
          label={field.label}
          value={value || ''}
          onChange={handleChange}
          className={classes.select}
          disabled={isDisabled}
        >
          {options && options[field.name] ? options[field.name].map((option, index) => (
            <MenuItem key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          )) : null}
        </Select>
        {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
