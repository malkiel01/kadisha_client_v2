// import React, { useState, useEffect } from 'react'
// import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
// import { makeStyles } from '@material-ui/styles'
// import { useTheme } from '@mui/system'
// import NotFoundLayouts from '../pages/NotFoundLayouts'

// const ContentLayouts = (criteria = {}) => {
//     const {data, clickBtnAdd} = criteria
//     const theme = useTheme(); // כאן הוסף את זה
//     const isMdScreen = useMediaQuery(theme.breakpoints.up('md'))


//     const [adjustedHeight, setAdjustedHeight] = useState(0);
//     const calculateAdjustedHeight = () => {
//         const windowHeight = window.innerHeight;
//         const elementTop = document.getElementById('idContentLayouts').getBoundingClientRect().top
//         const newAdjustedHeight = windowHeight - elementTop
//         setAdjustedHeight(newAdjustedHeight >= 0 ? newAdjustedHeight : 0)
//     }
//     useEffect(() => {
//           // קבע את הגובה מתאם כאשר הרכיב נטען
//           calculateAdjustedHeight();
  
//           // הוסף את האירוע לחישוב הגובה מתאם כאשר החלון משתנה
//           window.addEventListener('resize', calculateAdjustedHeight);
  
//           // ניקוי אירוע כאשר הרכיב יוסר
//           return () => {
//               window.removeEventListener('resize', calculateAdjustedHeight);
//           };
//     }, []);
    
//     const useStyles = makeStyles(
//         {
//             rootHeader: { // הוסף שם שאתה רוצה לתת לדיב הראשי
//             border: 'red solid 1px',
//             minHeight: adjustedHeight, // גובה מינימלי
//             backgroundColor: theme.palette.background.paper,
//             padding: theme.spacing(2),
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderRadius: theme.shape.borderRadius, // רקע מעגלי
//             position: 'relative'
//             },
//             titleHeader : {
//                 backgroundColor: '#e0e0e0', // רקע אפרפר
//                 width: '100%', // Default width
//                 minWidth: '50%',
//                 borderRadius: 50,
//                 padding: theme.spacing(2),
//                 borderRadius: 30, // רקע מעגלי
//                 // borderRadius: theme.shape.borderRadius, // רקע מעגלי
//                 '& > p': {
//                     margin: 0, // מסיר מרווחי טקסט
//                 },
//             },
//             mdWidth: {
//                 [theme.breakpoints.up('md')]: {
//                     width: '50%', // Width on md screens and larger
//                 },
//             },
//             gridButton : {
//                 backgroundColor: theme.palette.primary.light,
//                 position: 'absolute',
//                 left: 40,
//                 borderRadius: theme.shape.borderRadius, // רקע מעגלי
//                 borderRadius: 50,
//                 width: '80px', // הגדר רוחב עבור הכפתור
//                 height: '80px', // הגדר גובה עבור הכפתור
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center', // למרכז הטקסט בתוך הכפתור
//             },
//             myButton : {
//                 border: 'green 1px solid',
//                 borderRadius: 50,
//                 width: '60px', // הגדר רוחב עבור הכפתור
//                 height: '60px', // הגדר גובה עבור הכפתור
//             }
//         });
//     const classes = useStyles();

//     return (
//         <Box 
//         id='idContentLayouts'
//         className={classes.rootHeader}
//         >
//         {data ? data : <NotFoundLayouts/>}
//         </Box>
//     )
// }

// export default ContentLayouts;
