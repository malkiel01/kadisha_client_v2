import React from 'react';
import { TextField, Box, FormHelperText } from '@mui/material';
import useStyles from '../useStylesOld';

const TextFieldComponent = ({ field, value, handleChange, error }) => {
  const classes = useStyles();
  const isDisabled = field.disabled || field.lock;

  return (
    <Box className={classes.textFieldContainer}>
      <TextField
        name={field.name}
        label={field.label}
        value={value || ''}
        onChange={handleChange}
        error={!!error}
        className={classes.textField}
        fullWidth
        disabled={isDisabled}
      />
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </Box>
  );
};

export default TextFieldComponent;
