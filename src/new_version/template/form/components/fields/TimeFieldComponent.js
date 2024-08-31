import React, { useState } from 'react';
import { TextField, Box, FormHelperText } from '@mui/material';
import { TextFieldContainer, ErrorText, TextFieldStyled } from '../newFormTemplateStyles';

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
      <TextFieldStyled
        as={TextField} // שימוש ב-MUI TextField בתוך ה-`styled component`
        type="time"
        name={field?.name}
        value={time}
        onChange={handleDateChange}
        error={!!error}
        fullWidth
      />
      {error && <FormHelperText component={ErrorText}>{error}</FormHelperText>}
    </TextFieldContainer>
  );
};

export default TimeFieldComponent;
