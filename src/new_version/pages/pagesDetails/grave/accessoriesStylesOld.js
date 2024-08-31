// import * as React from 'react';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
// import AddIcon from '@mui/icons-material/Add';

// // ייבוא CSS עבור viewer
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// import { Grid, Box, Typography, Paper } from '@mui/material';

// import Fab from '@mui/material/Fab';
// import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';
// import LoadingOverlay from '../../pagesMains/LoadingOverlay';
// import useQueries from '../../../../database/useQueries';
// import { useEffect } from 'react';
// import ImageUpload from '../../plagins/documents/ImageUpload';
// import { useState } from 'react';
// import { fetchFiles } from '../../plagins/documents/GravesImagesList';
// import { useContext } from 'react';
// import { GlobalContext } from '../../../../App';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     minHeight: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   containerBtn: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%', // Full height of the parent div
//   },
//   button: {
//     fontSize: '1.5rem',
//     padding: theme.spacing(2, 4),
//   },
//   iconLock: {
//     fontSize: 98,
//     color: 'red',
//     animation: '$shake 0.8s infinite',
//   },
//   '@keyframes shake': {
//     '0%': { transform: 'scale(1)' },
//     '50%': { transform: 'scale(1.2)' },
//     '100%': { transform: 'scale(1)' },
//   },
// }));

// const AnimatedLockIcon = () => {
//   const classes = useStyles();

//   return <ErrorOutlineOutlinedIcon className={classes.iconLock} />;
// };

// export function GroupSizesColors({ buttons }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100%',
//         '& > *': {
//           mr: 10,
//           ml: 10,
//         },
//       }}
//     >
//       <ButtonGroup size="large" aria-label="Large button group">
//         {buttons}
//       </ButtonGroup>
//     </Box>
//   );
// }

// export const BtnCreatePurchase = ({ graveId = -1, content = null }) => {
//   const classes = useStyles();
//   const navigate = useNavigate()
//   const { permission } = useContext(GlobalContext);
//   const myPermissions = [1,2]

//   function isObjectEmpty(obj) {
//     return Object.keys(obj).length === 0 && obj.constructor === Object;
//   }

//   const handleButtonClick = () => {
//     navigate('/purchaseCreate', { state: { grave: graveId, burialContent: content } });
//   };

//   return (
//     <Box className={classes.container}>
//       {content && !isObjectEmpty(content) ? (
//         <Box className={classes.containerBtn}>
//           <AnimatedLockIcon className={classes.iconLock} />
//           <Typography>לא ניתן ליצור תיק רכישה, קיים תיק קבורה</Typography>
//         </Box>
//       ) : (
//         <Box className={classes.containerBtn}>
//           <Fab variant="extended" onClick={handleButtonClick} disabled={(permission === 0) ? false : !(myPermissions.includes(permission))} >
//             <AddIcon sx={{ mr: 1 }} />
//             צור תיק רכישה
//           </Fab>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export const BtnCreateBurial = ({ graveId = -1, content = null }) => {
//   const classes = useStyles();
//   const navigate = useNavigate()
//   const { permission } = useContext(GlobalContext);
//   const myPermissions = [1,2]

//   const handleButtonClick = () => {
//     navigate('/burialCreate', { state: { grave: graveId, content } });
//   };

//   return (
//     <Box className={classes.container}>
//       <Box className={classes.containerBtn}>
//         <Fab variant="extended" onClick={handleButtonClick} disabled={(permission === 0) ? false : !(myPermissions.includes(permission))}>
//           <AddIcon sx={{ mr: 1 }} />
//           צור תיק קבורה
//         </Fab>
//       </Box>
//     </Box>
//   );
// };

// export function AttachedDocuments({ grave }) {
//   const { token } = useContext(GlobalContext);

//   // טעינת היוזים לפונקציות עזר
//   const { getEntityByAttr } = useQueries();

//   const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
//   const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
//   const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
//   const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
//   const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
//   // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
//   const loading = loadingAreaGraves || loadingGraves || loadingCemeteries || loadingBlocks || loadingPlots;

//   // const documents2 = [
//   //   { id: 1, src: `../images/docConsular.png`, fileName: 'אישור קונסולרי.pdf', handleClick: () => { } },
//   //   { id: 1, src: `https://mbe-plus.com/kadisha_v1/kadisha_1/gravesImages/1-1-1-4.jpg`, fileName: 'אישור קונסולרי.pdf', handleClick: () => { } },
//   // ];

//   const getNmeImage = (id) => {

//     const grave = getEntityByAttr(localGraves, 'id', id)
//     const areaGrave = getEntityByAttr(localAreaGraves, 'gravesList', grave?.areaGraveId)
//     const plot = getEntityByAttr(localPlots, 'id', areaGrave?.plotId)
//     const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
//     const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

//     return `/${cemetery?.id}/${block?.id}/${plot?.id}/${areaGrave?.id}/${id}`
//   }

//   const [documents, setDocuments] = useState([]);

//   useEffect(() => {
//     const loadDocuments = async () => {
//       if (!loading && grave?.id) {
//         const fetchedDocuments = await fetchFiles(`/gravesImages${getNmeImage(grave?.id)}`);
//         setDocuments(fetchedDocuments);
//       }
//     };

//     loadDocuments();
//   }, [loading]);

//   if (loading) return <LoadingOverlay />


//   return (
//     <Grid
//       container
//       style={{
//         height: '100%', // תופס את מלוא הגובה של הדיב האב
//         width: '100%',  // תופס את מלוא הרוחב של הדיב האב
//       }}
//     >
//       {/* גריד ימני */}
//       <Grid
//         item
//         style={{
//           height: '100%', // גובה מלא של דיב האב
//           flex: 1, // תופס את יתר הרוחב
//           overflow: 'hidden', // מונע מהתוכן להגדיל את גובה הגריד
//         }}
//       >
//         <Box
//           sx={{
//             height: 350, // גובה מלא בתוך הגריד
//             overflowY: 'auto', // מאפשר גלילה של התוכן בתוך ה-Box
//             display: 'flex',
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'flex-start',
//             alignItems: 'flex-start',
//           }}
//         >
//           <ImageGrid images={documents} />
//         </Box>
//       </Grid>

//       {/* גריד שמאלי */}
//       <Grid
//         item
//         style={{
//           width: 250, // רוחב של 250 פיקסלים
//         }}
//       >
//         <Box
//           sx={{ height: '100%', }} // תופס את מלוא הגובה של הדיב האב
//         >
//           <ImageUpload url={`/gravesImages${getNmeImage(grave?.id)}`} />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }

// const ImageGrid = ({ images }) => {
//   const gridStyle = {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     flexWrap: 'wrap',
//     minWidth: '200px',
//     maxWidth: '100%',
//     direction: 'rtl',
//   };

//   return (
//     <div style={gridStyle}>
//       {images?.map((image, index) => (
//         <Paper
//           key={index}
//           elevation={0} // נותן מגוון של elevation
//           sx={{ m: 1, width: 128, height: 128, }}
//         >
//           <DocumentImage
//             key={index}
//             id={image.id}
//             src={image.src}
//             fileName={image.fileName}
//             handleClick={image.handleClick}
//           />
//         </Paper>
//       ))}
//     </div>
//   );
// };

// const DocumentImage = ({ id, src, fileName, handleClick }) => {
//   const [isClicked, setIsClicked] = useState(false);

//   const imageStyle = {
//     height: '80px',
//     width: '60px',
//     cursor: 'pointer',
//     filter: isClicked ? 'brightness(50%)' : 'none',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // צל מכל הכיוונים
//     borderRadius: '4px', // פינות עגולות
//     transition: 'transform 0.3s ease',
//   };

//   const imageContainerStyle = {
//     // margin: '0 10px',
//     margin: 0,
//     // marginTop: 2,
//     textAlign: 'center',
//     width: '150px', // רוחב קבוע של 100 פיקסלים
//   };


//   const textStyle = {
//     filter: 'blur(0.1px)', // טשטוש עדין
//     fontWeight: 'bold', // טקסט מודגש
//     marginTop: '8px', // רווח בין התמונה לטקסט
//     textAlign: 'center', // יישור טקסט למרכז
//   };



//   return (
//     <div style={imageContainerStyle}>
//       <img
//         src={src}
//         alt="Document"
//         style={imageStyle}
//         onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//         onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//         onClick={() => handleClick(id, fileName, setIsClicked)}



//         onError={(e) => e.currentTarget.src = `../images/docConsular.png`} // הוסף כאן את הקישור לתמונת ברירת המחדל

//       />
//       <div style={textStyle}>{fileName}</div>
//     </div>
//   );
// };

// export default DocumentImage;



