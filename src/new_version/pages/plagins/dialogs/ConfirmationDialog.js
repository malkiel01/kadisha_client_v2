import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ConfirmationDialog = ({ open, title, content, onAnswer }) => {

  const handleAnswer = (answer) => {
    onAnswer(answer);
  };

  return (
    <Dialog open={open} onClose={() => handleAnswer(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
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

export default ConfirmationDialog;
