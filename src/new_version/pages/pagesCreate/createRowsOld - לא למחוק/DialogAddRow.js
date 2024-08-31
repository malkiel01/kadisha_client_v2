// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close'
// import PropTypes from 'prop-types';
// import Grid from './Grid';

// const DialogAddRow = ({ open, handleClose, plotId }) => {
//   const [rows, setRows] = useState([]);

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md" // הגדרת רוחב מקסימלי
//       fullWidth // התאם את הרוחב לתוכן
//       sx={{ '& .MuiDialog-paper': { minWidth: '300px', maxWidth: '800px' } }} // התאמת רוחב מותאם אישית
//     >
//       <DialogTitle>
//         {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'right' }}>
//             הוספת שורה חדשה
//           </Typography>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </div> */}
//       </DialogTitle>
//       <DialogContent>
//         <Grid rows={rows} plotId={plotId} />
//       </DialogContent>
//     </Dialog>
//   );
// };

// DialogAddRow.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   plotId: PropTypes.any.isRequired
// };

// export default DialogAddRow;
