import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';
import { Container, StyledButton } from './newBtnCreateBurialStyles'; // ייבוא העיצובים החדשים

export const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.5rem',
  padding: theme.spacing(2, 4),
}));


const BtnCreateBurial = ({ graveId = -1, purchaseContent = null }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/burialCreate', { state: { value: graveId, purchaseContent } });
  };

  return (
    <Container>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        צור תיק קבורה
      </StyledButton>
    </Container>
  );
};

export default BtnCreateBurial;
