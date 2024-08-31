import React, { useState } from 'react';
import useStyles from '../useStylesOld';
import { FormControl, TextField } from '@mui/material';

const TimeFieldComponent = ({ field, value, handleChange, error }) => {
  const classes = useStyles();
  const [time, setTime] = useState(value || '');

  const handleDateChange = (event) => {
    setTime(event.target.value);
    handleChange({
      target: {
        name: field?.name,
        value: event.target.value,
      },
    });
  };

  return (
    <TextField
      type="time"
      name={field?.name}
      value={time}
      onChange={handleDateChange}
      error={!!error}
      className={classes.textField}
      fullWidth
    />
  )
}

export default TimeFieldComponent;
