// import React from 'react';
// import { Card, Select, MenuItem, Box, Button, Typography } from '@mui/material';
// import useStyles from './useStyles';
// import { StyledCard, StyledFloorTitle } from './newStyles'; // ייבוא העיצובים החדשים
// import CloseIcon from '@mui/icons-material/Close';

// const BurialFloorCard = ({ floor, onTypeChange, onSave, onDelete, isLast }) => {
//   const classes = useStyles();
//   return (
//     <StyledCard>
//     <StyledFloorTitle variant="body1">
//         קומה: {floor.name}
//       </StyledFloorTitle>
//       <Select
//         className={classes.formControl}
//         value={floor.type}
//         onChange={(e) => onTypeChange(floor.id, e.target.value)}
//         displayEmpty
//         disabled={floor.saved}
//       >
//         <MenuItem value=""><em>הגדרת חלקה</em></MenuItem>
//         <MenuItem value={1}>פטורה</MenuItem>
//         <MenuItem value={2}>חריגה</MenuItem>
//         <MenuItem value={3}>סגורה</MenuItem>
//       </Select>
//       {!floor.saved && floor.type && (
//         <Box className={classes.saveButton}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => onSave(floor.id)}
//           >
//             שמירה
//           </Button>
//         </Box>
//       )}
//       {isLast && floor.saved && (
//         <CloseIcon
//           className={classes.deleteIcon}
//           onClick={() => onDelete(floor.id)}
//         />
//       )}
//     </StyledCard>
//   );
// };

// export default BurialFloorCard;
