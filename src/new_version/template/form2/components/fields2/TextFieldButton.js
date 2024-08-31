import React from 'react';
import { TextField, Box, FormHelperText, Button } from '@mui/material';
import useStyles from '../useStylesOld';
import { border, maxWidth, width } from '@mui/system';

const TextFieldButton = ({ field, value, handleChange, error }) => {
  const classes = useStyles();
  const isDisabled = field.disabled || field.lock;

  const click = {
    target: {
      name: field.name,
      value: 'new value' // אם יש ערך שאתה רוצה להעביר
    }
  };

  return (
    <Box className={classes.textFieldContainer} >
      <Button
       variant="contained" color="primary"
      className={classes.textField}
        name={field.name}
        value={value || ''}
        onClick={() => handleChange(click)}
        disabled={isDisabled}
      >
        {field.label}
      </Button>
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </Box>
  );
};

export default TextFieldButton;
