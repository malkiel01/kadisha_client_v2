import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText } from '@mui/material';
import { TextFieldContainer, FormControlStyled, SelectStyled, ErrorText } from '../newFormTemplateStyles';

const SelectComponent = ({ field, value, handleChange, error, options }) => {
  const isDisabled = field.disabled || field.lock;

  return (
    <TextFieldContainer>
      <FormControlStyled fullWidth error={!!error}>
        <InputLabel>{field.label}</InputLabel>
        <SelectStyled
          name={field.name}
          label={field.label}
          value={value || ''}
          onChange={handleChange}
          disabled={isDisabled}
        >
          {options && options[field.name] ? options[field.name].map((option, index) => (
            <MenuItem key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          )) : null}
        </SelectStyled>
        {error && <FormHelperText component={ErrorText}>{error}</FormHelperText>}
      </FormControlStyled>
    </TextFieldContainer>
  );
};

export default SelectComponent;
