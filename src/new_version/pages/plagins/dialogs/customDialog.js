import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CustomDialog({ open, handleClose, title, children }) {
  useEffect(() => {
    const handleRowSubmit = () => {
      // פעולות לביצוע לאחר סבמיט
      console.log("Row submitted");
      handleClose(false)
    };

    window.addEventListener('rowCreateSubmit', handleRowSubmit);

    return () => {
      window.removeEventListener('rowCreateSubmit', handleRowSubmit);
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ '& .MuiDialog-paper': { minWidth: '300px', maxWidth: '800px' } }}
    >
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'right' }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
