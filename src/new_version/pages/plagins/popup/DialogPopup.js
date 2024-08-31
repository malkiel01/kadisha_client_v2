import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import RowCreate from '../../pagesCreate/rowCreate';

const DialogPopup = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { open, title, plotId  } = location.state || {}

  const [openLocal, setOpenLocal] = useState(open)

  const hendleClose = () => {
    setOpenLocal(false)
    navigate(-1)
  }

  return (
    <Dialog
      open={openLocal}
      onClose={hendleClose}
      maxWidth="md" // הגדרת רוחב מקסימלי
      fullWidth // התאם את הרוחב לתוכן
      sx={{ '& .MuiDialog-paper': { minWidth: '300px', maxWidth: '800px' } }} // התאמת רוחב מותאם אישית
    >
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'right' }}>
          {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={hendleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {/* {body} */}
        <RowCreate  />
      </DialogContent>
    </Dialog>
  );
};

// DialogPopup.propTypes = {
//   open: PropTypes.bool.isRequired,
//   title: PropTypes.string,
//   handleClose: PropTypes.func.isRequired,
//   plotId: PropTypes.any.isRequired
// };

export default DialogPopup;
