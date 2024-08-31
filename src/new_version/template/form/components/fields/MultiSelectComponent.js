import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText, Checkbox, ListItemText, Grid } from '@mui/material';
import { TextFieldContainer, FormControlStyled, SelectStyled, ErrorText } from '../newFormTemplateStyles';
import { formatPriceIL } from '../../../../pages/plagins/data/commponentOptions';

const MultiSelectComponent = ({ field, value, handleChange, error, options }) => {

  useEffect(() => { }, []);

  const isDisabled = field.disabled || field.lock;

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    // הדפסת מערך כל הערכים שנבחרו
    console.log('Selected values:', typeof value === 'string' ? value.split(',') : value);

    handleChange({
      target: {
        name: field.name,
        value: typeof value === 'string' ? value.split(',') : value,
      },
    });
  };

  return (
    <TextFieldContainer>
      <FormControlStyled fullWidth error={!!error}>
        <InputLabel>{field.label}</InputLabel>
        <SelectStyled
          name={field.name}
          label={field.label}
          value={value || []}  // וודא שזו תמיד מערך
          onChange={handleSelectChange}
          disabled={isDisabled}
          multiple
          renderValue={(selected) => {
            const selectedArray = Array.isArray(selected) ? selected : [selected];  // וודא שהערך הוא תמיד מערך
            return selectedArray
              .map((selectedValue) => {
                const selectedOption = options?.find((option) => option.value === selectedValue); // בדוק אם options מוגדר
                return selectedOption ? selectedOption.label : selectedValue;
              })
              .join(', ');
          }}
        >
          {options?.length && options?.length > 0
            ? options.map((option, index) => {
              return (
                <MenuItem key={`${option.value}-${index}`} value={option.value}>
                  <Checkbox checked={Array.isArray(value) && value.indexOf(option.value) > -1} />
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <ListItemText primary={option.label} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary={formatPriceIL(option.price)} />
                    </Grid>
                  </Grid>
                </MenuItem>
              );
            })
            : null}
        </SelectStyled>
        {error && (
          <FormHelperText sx={{ color: 'red' }}>
            {error}
          </FormHelperText>
        )}
      </FormControlStyled>
    </TextFieldContainer>
  );
};

export default MultiSelectComponent;
