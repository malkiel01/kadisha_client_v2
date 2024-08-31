import React, { useState, useEffect } from 'react';
import { TextField, Box, FormHelperText, Autocomplete, Button } from '@mui/material';
import useStyles from '../useStylesOld';

const SelectedFreeComponent = ({ field, value, handleChange, error, options, noClearable = false }) => {
  const classes = useStyles();
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
    <Box className={classes.textFieldContainer}>
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
          <TextField
            {...params}
            label={field.label}
            name={field.name}
            error={!!error}
            className={classes.textField}
            fullWidth
            disabled={field.disabled}
            InputProps={{
              ...params.InputProps,
              style: {

              },
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
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </Box>
  );
};

export default SelectedFreeComponent;
