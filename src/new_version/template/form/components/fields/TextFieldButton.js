import React from 'react';
import { TextFieldContainer, ErrorText } from '../newFormTemplateStyles';
import { Button, FormHelperText, Box } from '@mui/material';

const TextFieldButton = ({ field, value, handleChange, error }) => {
  const isDisabled = field.disabled || field.lock;

  const click = {
    target: {
      name: field.name,
      value: 'new value' // אם יש ערך שאתה רוצה להעביר
    }
  };

  return (
    <TextFieldContainer>
      <Button
        variant="contained"
        color="primary"
        name={field.name}
        value={value || ''}
        onClick={() => handleChange(click)}
        disabled={isDisabled}
        fullWidth
      >
        {field.label}
      </Button>
      {error && (
        <FormHelperText sx={{ color: 'red' }}>
          {error}
        </FormHelperText>
      )}
    </TextFieldContainer>
  );
};

export default TextFieldButton;
