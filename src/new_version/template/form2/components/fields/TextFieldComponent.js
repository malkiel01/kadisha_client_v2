import React from 'react';
import { TextField, Box, FormHelperText } from '@mui/material';
import { TextFieldContainer, ErrorText } from '../newFormTemplateStyles';

const TextFieldComponent = ({ field, value, handleChange, error }) => {
  const isDisabled = field.disabled || field.lock;

  return (
    <TextFieldContainer>
      <TextField
        name={field.name}
        label={field.label}
        value={value || ''}
        onChange={handleChange}
        error={!!error}
        fullWidth
        disabled={isDisabled}
      />
      {error && (
        <FormHelperText sx={{ color: 'red' }}>
          {error}
        </FormHelperText>
      )}
    </TextFieldContainer>
  );
};

export default TextFieldComponent;
