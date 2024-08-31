import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

export const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.5rem',
  padding: theme.spacing(2, 4),
}));

const BtnCreatePurchase = ({graveId = -1, burialContent = null }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/purchaseCreate', { state: { value: graveId, burialContent } });
  };

  return (
    <Container>
      {burialContent ? (
        <Typography>
          קיים תיק קבורה
        </Typography>
      ) : (
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          צור תיק רכישה
        </StyledButton>
      )}
    </Container>
  );


  // return (
  //   <Box className={classes.container}>
  //     {
  //       burialContent ?
  //     <Typography>
  //       קיים תיק קבורה
  //     </Typography>
  //     :
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       className={classes.button}
  //       onClick={handleButtonClick}
  //     >
  //       צור תיק רכישה
  //     </Button> 
  //     }
  //   </Box>
  // );
};

export default BtnCreatePurchase;
