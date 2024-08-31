import React, { useState, useEffect } from 'react';
import { TextField, Box, FormHelperText, Autocomplete, Button } from '@mui/material';
import { TextFieldContainer, TextFieldStyled, ErrorText } from '../newFormTemplateStyles';

const SelectedFreeComponent = ({ field, value, handleChange, error, options, noClearable = false }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      const option = options[field.name]?.find(option => option.value === value);
      if (option) {
        setInputValue(option.label);
      }
    }
  }, [value, field.name, options]);

  return (
    <TextFieldContainer>
      <Autocomplete
        options={options && options[field.name] ? options[field.name] : []}
        value={options[field.name]?.find(option => option.value === value) || null}
        onChange={(event, newValue) => {
          handleChange({
            target: {
              name: field.name,
              value: newValue ? newValue.value : '',
            },
          });
          setInputValue(newValue ? newValue.label : '');
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextFieldStyled
            {...params}
            label={field.label}
            name={field.name}
            error={!!error}
            fullWidth
            disabled={field.disabled}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        filterOptions={(options, { inputValue }) => 
          options?.filter(option =>
            option?.searchFields?.toLowerCase().includes(inputValue?.toLowerCase())
          )
        }
        renderOption={(props, option) => (
          <li {...props} key={option.value}>
            {option.list}
          </li>
        )}
        clearOnEscape={!field.disabled}
        disabled={field.disabled}
        disableClearable={noClearable} // שדה זה מונע הצגת ה-X למחיקה
      />
      {error && <FormHelperText component={ErrorText}>{error}</FormHelperText>}
    </TextFieldContainer>
  );
};

export default SelectedFreeComponent;
