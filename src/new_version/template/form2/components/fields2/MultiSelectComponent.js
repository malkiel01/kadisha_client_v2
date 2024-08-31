import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText, Checkbox, ListItemText, Grid } from '@mui/material';
import useStyles from '../useStylesOld';
import { useEffect } from 'react';
import { formatPriceIL } from '../../../../pages/plagins/data/commponentOptions';

const MultiSelectComponent = ({ field, value, handleChange, error, options }) => {

  useEffect(() => {}, []);

  const classes = useStyles();
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
    <Box className={classes.textFieldContainer}>
      <FormControl fullWidth error={!!error}>
        <InputLabel>{field.label}</InputLabel>
        <Select
          name={field.name}
          label={field.label}
          value={value || []}  // וודא שזו תמיד מערך
          onChange={handleSelectChange}
          className={classes.select}
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
        </Select>
        {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default MultiSelectComponent;
