import React from 'react';
import useStyles from '../useStylesOld';
import { Box, Button } from '@mui/material';

const ViewportChecklist = ({ field, options, value, handleChange, error }) => {
  const classes = useStyles();

  const handleButtonClick = (optionValue) => {
    const newValue = [...value];
    const index = newValue.indexOf(optionValue);
    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(optionValue);
    }
    handleChange({
      target: {
        name: field?.name,
        value: newValue,
      },
    });
  };

  return (
    <Box className={classes.textFieldContainer}>
      <Box className={`${classes.buttonGroup}`}>
      {options.map((option, index) => (
          <Button
            key={index}
            type="button"
            className={`${classes.buttonInGroup} ${value.includes(option.value) ? classes.buttonSelected : ''}`}
            onClick={() => handleButtonClick(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </Box>
  </Box>
  );
  return (
    <div className={classes.textFieldContainer}>
      <div className={classes.buttonGroup}>
        {options.map((option, index) => (
          <Button
            key={index}
            type="button"
            className={`${classes.button} ${classes.buttonInGroup} ${value.includes(option.value) ? classes.buttonSelected : ''}`}
            onClick={() => handleButtonClick(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default ViewportChecklist;
