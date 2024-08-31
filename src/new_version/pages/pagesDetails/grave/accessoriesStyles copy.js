// import * as React from 'react';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';


// import { Worker, Viewer, PdfJs } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// // ייבוא CSS עבור viewer
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';


// import { Grid, Box, Typography, Button, Card, ThemeProvider, createTheme, styled, Paper, IconButton, Tooltip } from '@mui/material';

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

// import axios from 'axios';
// import ConfirmationDialog from '../../plagins/dialogs/ConfirmationDialog';

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

// export const TabContentColumnsBurial = ({ grave, burial, columns }) => {
//   const navigate = useNavigate()

//   const edit = () => {
//     navigate('/burialUpdate', { state: { grave: grave, value: burial } });
//   };

//   const del = (v) => { console.log('חסרה פעולת מחיקה') }

//   if (columns?.length > 0) {
//     return (
//       <Grid
//         container
//         direction="column"
//         style={{
//           height: '100%',
//           // border: '1px solid red',
//         }}
//       >
//         {/* גריד עליון */}
//         <Grid
//           item
//           style={{
//             flex: 1, // תופס את כל הגובה הפנוי
//             // border: '1px solid red',
//           }}
//         >
//           <Grid container spacing={2}>
//             {columns.map((column, index) => {
//               return (
//                 <Grid item xs={4} key={index}>
//                   <Box sx={{ textAlign: 'left' }}>
//                     {
//                       column &&
//                       <Typography color="textSecondary">
//                         <span style={{ fontWeight: 'bold' }}>{column?.title}</span>
//                         <span>{`: `}</span>
//                         <span>{column?.value}</span>
//                       </Typography>
//                     }
//                   </Box>
//                 </Grid>
//               )
//             })}
//           </Grid>
//         </Grid>

//         {/* גריד תחתון */}
//         <Grid item>
//           <GroupSizesColors buttons={
//             [
//               <Button key="one" onClick={edit}><EditIcon /><span style={{ marginRight: 10 }}>עריכה</span></Button>,
//               <Button key="two" color='warning' onClick={del}><DeleteIcon /><span style={{ marginRight: 10 }}>מחיקה</span></Button>,
//             ]
//           } />
//         </Grid>
//       </Grid>
//     );
//   } else {
//     return <BtnCreateBurial graveId={grave} />
//   }
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


// const DocumentImageOld1 = ({ id, src, fileName, handleClick }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const isPDF = fileName.toLowerCase().endsWith('.pdf');
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const imageStyle = {
//     height: '80px',
//     width: '60px',
//     cursor: 'pointer',
//     filter: isClicked ? 'brightness(50%)' : 'none',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '4px',
//     transition: 'transform 0.3s ease',
//   };

//   const pdfStyle = {
//     height: '800px',
//     width: '600px',
//     cursor: 'pointer',
//     filter: isClicked ? 'brightness(50%)' : 'none',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '4px',
//     transition: 'transform 0.3s ease',
//     overflow: 'hidden',
//   };

//   const imageContainerStyle = {
//     margin: 0,
//     textAlign: 'center',
//     width: '150px',
//   };

//   const textStyle = {
//     filter: 'blur(0.1px)',
//     fontWeight: 'bold',
//     marginTop: '8px',
//     textAlign: 'center',
//   };

//   return (
//     <div style={imageContainerStyle}>
//       {isPDF ? (
//         <div style={pdfStyle} onClick={() => handleClick(id, fileName, setIsClicked)}>
//           {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js`}>
//             <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
//           </Worker> */}
//           <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//             <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
//           </Worker>

//         </div>
//       ) : (
//         <img
//           src={src}
//           alt="Document"
//           style={imageStyle}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//           onClick={() => handleClick(id, fileName, setIsClicked)}
//           onError={(e) => (e.currentTarget.src = `../images/docConsular.png`)}
//         />
//       )}
//       <div style={textStyle}>{fileName}</div>
//     </div>
//   );
// };

// const DocumentImagePDF_NO_WORKING = ({ id, src, fileName, handleClick }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const isPDF = fileName.toLowerCase().endsWith('.pdf');
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

//   useEffect(() => {
//     if (isPDF) {
//       const fetchPdf = async () => {
//         try {
//           const response = await axios.get(src, { responseType: 'blob' });
//           const url = URL.createObjectURL(response.data);
//           setPdfBlobUrl(url);
//         } catch (error) {
//           console.error('Error fetching PDF:', error);
//         }
//       };
//       fetchPdf();
//     }
//   }, [src, isPDF]);

//   const imageStyle = {
//     height: '80px',
//     width: '60px',
//     cursor: 'pointer',
//     filter: isClicked ? 'brightness(50%)' : 'none',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '4px',
//     transition: 'transform 0.3s ease',
//   };

//   const pdfStyle = {
//     height: '800px',
//     width: '600px',
//     cursor: 'pointer',
//     filter: isClicked ? 'brightness(50%)' : 'none',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '4px',
//     transition: 'transform 0.3s ease',
//     overflow: 'hidden',
//   };

//   const imageContainerStyle = {
//     margin: 0,
//     textAlign: 'center',
//     width: '150px',
//   };

//   const textStyle = {
//     filter: 'blur(0.1px)',
//     fontWeight: 'bold',
//     marginTop: '8px',
//     textAlign: 'center',
//   };

//   return (
//     <div style={imageContainerStyle}>


//       {/* <PdfImageComponentLocal
//             pdfUrl={`
//             https://mbe-plus.com/kadishaV1/kadisha_1/gravesImages/1/1/1/4/16/1722519477892-test.pdf
//             `} /> */}

//       {/* <DownloadAndStoreFile
//                 fileUrl={`
//             https://mbe-plus.com/kadishaV1/kadisha_1/gravesImages/1/1/1/4/16/1722519477892-test.pdf
//             `} storageKey='testImage' 
//                 /> */}

//       {isPDF && pdfBlobUrl ? (
//         <div style={pdfStyle} onClick={() => handleClick(id, fileName, setIsClicked)}>
//           <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//             <Viewer fileUrl={pdfBlobUrl} plugins={[defaultLayoutPluginInstance]} />
//           </Worker>
//         </div>
//       ) : (
//         <img
//           src={src}
//           alt="Document"
//           style={imageStyle}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//           onClick={() => handleClick(id, fileName, setIsClicked)}
//           onError={(e) => (e.currentTarget.src = `../images/docConsular.png`)}
//         />
//       )}
//       <div style={textStyle}>{fileName}</div>
//     </div>
//   );
// };

// const DownloadAndStoreFile = ({ fileUrl, storageKey }) => {
//   const [fileBlobUrl, setFileBlobUrl] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const downloadFile = async () => {
//       try {
//         const response = await fetch(fileUrl);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const blob = await response.blob();
//         const blobUrl = URL.createObjectURL(blob);

//         // Store the file in localStorage
//         localStorage.setItem(storageKey, blobUrl);

//         // Update state to reflect the stored file
//         setFileBlobUrl(blobUrl);
//       } catch (error) {
//         setError(error.message);
//         console.error('Error downloading file:', error);
//       }
//     };

//     // Check if the file is already in localStorage
//     const cachedFile = localStorage.getItem(storageKey);
//     if (cachedFile) {
//       setFileBlobUrl(cachedFile);
//     } else {
//       downloadFile();
//     }
//   }, [fileUrl, storageKey]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {fileBlobUrl ? (
//         <p>File downloaded and stored successfully!</p>
//       ) : (
//         <p>Downloading and storing file...</p>
//       )}
//     </div>
//   );
// };


// const PdfImageComponentLocal = ({ pdfUrl }) => {
//   const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

//   useEffect(() => {
//     // Check if the PDF is already in localStorage
//     const cachedPdf = localStorage.getItem('cachedPdf');
//     if (cachedPdf) {
//       setPdfBlobUrl(cachedPdf);
//     } else {
//       // Fetch the PDF and save it to localStorage
//       fetch(pdfUrl)
//         .then(response => response.blob())
//         .then(blob => {
//           const blobUrl = URL.createObjectURL(blob);
//           localStorage.setItem('cachedPdf', blobUrl);
//           setPdfBlobUrl(blobUrl);
//         })
//         .catch(error => console.error('Error fetching PDF:', error));
//     }
//   }, [pdfUrl]);

//   return (
//     <div style={{ width: '100px', height: '100px', border: '1px solid black' }}>
//       {pdfBlobUrl ? (
//         <img src={pdfBlobUrl} alt="PDF Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// const PdfImageComponent = ({ pdfImageUrl }) => {
//   const divStyle = {
//     width: '100px',
//     height: '100px',
//     border: '1px solid black',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden'
//   };

//   const imgStyle = {
//     maxWidth: '100%',
//     maxHeight: '100%'
//   };

//   return (
//     <div style={divStyle}>
//       <img src={pdfImageUrl} alt="PDF Preview" style={imgStyle} />
//     </div>
//   );
// };


// export default DocumentImage;



