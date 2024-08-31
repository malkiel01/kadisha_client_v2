import React from 'react';
import { Box, Button } from '@mui/material';
import { TextFieldContainer, ButtonGroup, ButtonInGroup, ButtonSelected } from '../newFormTemplateStyles';

const ViewportChecklist = ({ field, options, value, handleChange, error }) => {

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
    <TextFieldContainer>
      <ButtonGroup>
        {options.map((option, index) => (
          <Button
            key={index}
            type="button"
            className={`${ButtonInGroup} ${value.includes(option.value) ? ButtonSelected : ''}`}
            onClick={() => handleButtonClick(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </TextFieldContainer>
  );
};

export default ViewportChecklist;
