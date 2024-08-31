import React, { useState } from 'react';
import useStyles from '../useStylesOld';
import { FormHelperText, TextField } from '@mui/material';

const DateFieldComponent = ({ field, value, handleChange, error }) => {
  const classes = useStyles();
  const [date, setDate] = useState(value || '');

  const handleDateChange = (event) => {
    setDate(event.target.value);
    handleChange({
      target: {
        name: field?.name,
        value: event.target.value,
      },
    });
  };

  return (
    <>
      <TextField
        type="date"
        name={field?.name}
        value={date}
        onChange={handleDateChange}
        error={!!error}
        className={classes.textField}
        fullWidth
        disabled={field.disabled}
      />
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </>
  )
}

export default DateFieldComponent;
