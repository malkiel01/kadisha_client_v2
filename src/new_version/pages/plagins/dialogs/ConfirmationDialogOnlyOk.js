import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import PurchaseUpdate2 from '../../pagesUpdate/perrmision2/purchaseUpdate2';

const ConfirmationDialogOnlyOk = ({ open, title, content, onAnswer = () => {} }) => {

  const handleAnswer = (answer) => {
    onAnswer(answer);
  };

  return (
    <Dialog open={open} onClose={() => handleAnswer(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
          {/* <PurchaseUpdate2 /> */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => handleAnswer(true)} color="secondary">
          
        </Button> */}
        <Button onClick={() => handleAnswer(false)} color="primary">
          לא
        </Button>
        <Button onClick={() => handleAnswer(true)} color="secondary">
          כן
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogOnlyOk;
