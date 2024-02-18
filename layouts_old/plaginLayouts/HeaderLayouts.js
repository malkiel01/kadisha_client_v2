// import React from 'react'
// import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
// import { makeStyles } from '@material-ui/styles'
// import { useTheme } from '@mui/system'

// const HeaderLayouts = (criteria = {}) => {
//     const {title, clickBtnAdd} = criteria
//     const theme = useTheme(); // כאן הוסף את זה


//     const isMdScreen = useMediaQuery(theme.breakpoints.up('md'))

//     // const useStyles = makeStyles((theme) => ({
        
//     //             // {
//     //         rootHeader: { // הוסף שם שאתה רוצה לתת לדיב הראשי
//     //         minHeight: 200, // גובה מינימלי
//     //         backgroundColor: theme.palette.background.paper,
//     //         padding: theme.spacing(2),
//     //         display: 'flex',
//     //         flexDirection: 'column',
//     //         alignItems: 'center',
//     //         justifyContent: 'center',
//     //         borderRadius: theme.shape.borderRadius, // רקע מעגלי
//     //         position: 'relative'
//     //         },
//     //         titleHeader : {
//     //             backgroundColor: '#e0e0e0', // רקע אפרפר
//     //             width: '100%', // Default width
//     //             minWidth: '50%',
//     //             borderRadius: 50,
//     //             padding: theme.spacing(2),
//     //             borderRadius: 30, // רקע מעגלי
//     //             // borderRadius: theme.shape.borderRadius, // רקע מעגלי
//     //             '& > p': {
//     //                 margin: 0, // מסיר מרווחי טקסט
//     //             },
//     //         },
//     //         mdWidth: {
//     //             [theme.breakpoints.up('md')]: {
//     //                 width: '50%', // Width on md screens and larger
//     //             },
//     //         },
//     //         gridButton : {
//     //             backgroundColor: theme.palette.primary.light,
//     //             position: 'absolute',
//     //             left: 40,
//     //             borderRadius: theme.shape.borderRadius, // רקע מעגלי
//     //             borderRadius: 50,
//     //             width: '80px', // הגדר רוחב עבור הכפתור
//     //             height: '80px', // הגדר גובה עבור הכפתור
//     //             display: 'flex',
//     //             alignItems: 'center',
//     //             justifyContent: 'center',
//     //             textAlign: 'center', // למרכז הטקסט בתוך הכפתור
//     //         },
//     // //         // myButton : {
//     // //         //     // border: 'green 1px solid',
//     // //         //     borderRadius: 50,
//     // //         //     width: '60px', // הגדר רוחב עבור הכפתור
//     // //         //     height: '60px', // הגדר גובה עבור הכפתור
//     // //         // }
//     //     // }
//     // }))


//     const useStyles = makeStyles(
//         {
//             rootHeader: { // הוסף שם שאתה רוצה לתת לדיב הראשי
//             minHeight: 200, // גובה מינימלי
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
//             }
//         });
//     const classes = useStyles()



//     return (
//         <Box 
//         className={classes.rootHeader}
//         xs={{minHeight : 200}}
//          >
//             <Grid className={`${classes.titleHeader} ${isMdScreen ? classes.mdWidth : ''}`}>
//                     <Typography variant="h6" align="center">
//                         {title}
//                     </Typography>
//             </Grid>
//             <Grid item className={classes.gridButton}>
//                 <Button 
//                     onClick={clickBtnAdd}
//                     sx={{
//                         backgroundColor: theme.palette.primary.main,
//                         borderRadius: 50, 
//                         minWidth: '80px', 
//                         minHeight: '80px', 
//                         maxWidth: '80px',
//                         maxHeight: '80px',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         textAlign: 'center', // למרכז הטקסט בתוך הכפתור     
//                     }}
//                      >
//                     <Typography variant="h6" align="center"
//                         style={{
//                             color: '#fff',
//                             transform: 'translate(1.5%,-3.9%)',
//                             fontSize: '60px'
//                         }}
//                     >
//                         +
//                     </Typography>
//                 </Button>
//             </Grid>
//         </Box>
//     )
// }

// export default HeaderLayouts;
