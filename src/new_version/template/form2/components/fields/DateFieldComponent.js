import React, { useState } from 'react';
import { FormHelperText, TextField } from '@mui/material';
import { TextFieldContainer, ErrorText } from '../newFormTemplateStyles';

const DateFieldComponent = ({ field, value, handleChange, error }) => {
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
    <TextFieldContainer>
      <TextField
        type="date"
        name={field?.name}
        value={date}
        onChange={handleDateChange}
        error={!!error}
        fullWidth
        disabled={field.disabled}
      />
      {error && (
        <FormHelperText sx={{ color: 'red' }}>
          {error}
        </FormHelperText>
      )}
    </TextFieldContainer>
  );
}

export default DateFieldComponent;