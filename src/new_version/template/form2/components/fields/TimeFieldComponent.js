import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { TextFieldContainer } from '../newFormTemplateStyles';

const TimeFieldComponent = ({ field, value, handleChange, error }) => {
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
    <TextFieldContainer>
      <TextField
        type="time"
        name={field?.name}
        value={time}
        onChange={handleDateChange}
        error={!!error}
        fullWidth
      />
    </TextFieldContainer>
  );
};

export default TimeFieldComponent;
