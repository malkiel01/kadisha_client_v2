import React from 'react';
import { Box, Button } from '@mui/material';
import { TextFieldContainer, ButtonStyled, ErrorText } from '../newFormTemplateStyles';

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
      <ButtonStyled>
        {options.map((option, index) => (
          <ButtonStyled
            key={index}
            type="button"
            className={`${ButtonStyled} ${value.includes(option.value) ? ButtonStyled : ''}`}
            onClick={() => handleButtonClick(option.value)}
          >
            {option.label}
          </ButtonStyled>
        ))}
      </ButtonStyled>
      {error && <ErrorText>{error}</ErrorText>}
    </TextFieldContainer>
  );
};

export default ViewportChecklist;
