// import React, { useState } from 'react';
// import { Card, CardContent, Typography, IconButton, CardMedia, Box } from '@mui/material'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

// const imageArray = [
//   '/path/to/first/image.jpg',
//   '/path/to/second/image.jpg',
//   '/path/to/third/image.jpg',
//   '/path/to/fourth/image.jpg',
// ]


// const data = [
//   [
//     { id: 0, name: 'plotNameHe', title: 'קבר', value: '1' },
//     { id: 1, name: 'plotNameEn', title: 'שורה', value: '5'},
//     { id: 2, name: 'idBlock', title: 'סוג הקבר', value: 'טרם בוצע' },
//     { id: 2, name: 'idBlock', title: 'סוג החלקה', value: 'טרם בוצע' },
//     { id: 2, name: 'idCemetery', title: 'סטטוס', value: 'טרם בוצע' },
//     { id: 2, name: 'idCemetery', title: 'גודל', value: 'טרם בוצע' },
//   ],[
//     { id: 2, name: 'idCemetery', title: 'בית העלמין', value: 'טרם בוצע' },
//     { id: 3, name: 'nationalInsuranceCode', title: 'גוש', value: 'הר תמיר' },
//     { id: 3, name: 'nationalInsuranceCode', title: 'חלקה', value: 'הר תמיר ראשי' },
//     { id: 3, name: 'nationalInsuranceCode', title: 'תאריך יצירה', value: '05/09/2003' },
//     { id: 3, name: 'nationalInsuranceCode', title: 'תאריך עדכון', value: '07/09/2003' },

//   ]
// ]


// const GraveDetils = () => {
//   const [imageIndex, setImageIndex] = useState(0);

//   const goToPrevious = () => {
//     setImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageArray.length - 1));
//   };

//   const goToNext = () => {
//     setImageIndex((prevIndex) => (prevIndex < imageArray.length - 1 ? prevIndex + 1 : 0));
//   };

//   return (
//     <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//       <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>

//         {/* <Box sx={{ maxWidth: 500 , textAlign: 'left'}}>
//           <Typography align="right">
//             קבר: 1
//             <br />
//             שורה: 3
//             <br />
//             סוג הקבר: קבורה רוויה
//             <br />
//             סוג החלקה: פטורה
//             <br />
//             סטטוס: רכישה
//             <br />
//             גודל: רגיל
//           </Typography>
//         </Box> */}
//           <Box sx={{ textAlign: 'left' }}>
//             {data[0]?.map((row, index) => {
//               if (index === 0 && row !== undefined) {
//                 return (
//                   <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
//                     <span style={{ fontWeight: 'bold' }}>{row?.title + `: `}</span>
//                     <span>{row?.value}</span>
//                   </Typography>
//                 )
//               } else {
//                 return (
//                   <Typography color="textSecondary">
//                     <span style={{ fontWeight: 'bold' }}>{row?.title}</span><span>{`: `}</span>
//                     <span>{row?.value}</span>
//                   </Typography>
//                 )
//               }
//             })}
//           </Box>
//           <Box sx={{ textAlign: 'left' }}>
//             {data[1]?.map((row, index) => {
//               if (index === 0 && row !== undefined) {
//                 return (
//                   <>
//                   <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
//                     <br />
//                   </Typography>
//                   <Typography color="textSecondary">
//                     <span style={{ fontWeight: 'bold' }}>{row?.title}</span><span>{`: `}</span>
//                     <span>{row?.value}</span>
//                   </Typography>
                  
//                   </>
//                 )
//               } else {
//                 return (
//                   <Typography color="textSecondary">
//                     <span style={{ fontWeight: 'bold' }}>{row?.title}</span><span>{`: `}</span>
//                     <span>{row?.value}</span>
//                   </Typography>
//                 )
//               }
//             })}
//           </Box>
//         {/* <Box sx={{ maxWidth: 500 }}>
//           <Typography align="center" sx={{ marginTop: 2 }}>
//             בית עלמין: גבעת שאול
//             <br />
//             גוש: הר תמיר
//             <br />
//             חלקה: הר תמיר ראשי
//             <br />
//             תאריך יצירה: 05/09/2003
//             <br />
//             תאריך עדכון: 07/09/2003
//             <br />
//             פעיל: כן
//           </Typography>
//         </Box> */}

//         <Box sx={{ maxWidth: 900 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <IconButton onClick={goToPrevious}>
//               <ArrowBackIosIcon />
//             </IconButton>
//             <CardMedia
//               component="img"
//               height="194"
//               image={imageArray[imageIndex]}
//               alt={`תמונה ${imageIndex + 1}`}
//             />
//             <IconButton onClick={goToNext}>
//               <ArrowForwardIosIcon />
//             </IconButton>
//           </div>
//           <Typography align="center" sx={{ marginBottom: 2 }}>
//             תמונה {imageIndex + 1} מתוך {imageArray.length}
//           </Typography>
//         </Box>
//       </CardContent>

//       <CardContent>
//         {/* <Typography align="right">
//           קבר: 1
//           <br />
//           שורה: 3
//           <br />
//           סוג הקבר: קבורה רוויה
//           <br />
//           סוג החלקה: פטורה
//           <br />
//           סטטוס: רכישה
//           <br />
//           גודל: רגיל
//         </Typography> */}
//         {/* <Typography align="center" sx={{ marginTop: 2 }}>
//           בית עלמין: גבעת שאול
//           <br />
//           גוש: הר תמיר
//           <br />
//           חלקה: הר תמיר ראשי
//           <br />
//           תאריך יצירה: 05/09/2003
//           <br />
//           תאריך עדכון: 07/09/2003
//           <br />
//           פעיל: כן
//         </Typography> */}
//       </CardContent>
//       {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <IconButton onClick={goToPrevious}>
//           <ArrowBackIosIcon />
//         </IconButton>
//         <CardMedia
//           component="img"
//           height="194"
//           image={imageArray[imageIndex]}
//           alt={`תמונה ${imageIndex + 1}`}
//         />
//         <IconButton onClick={goToNext}>
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </div>
//       <Typography align="center" sx={{ marginBottom: 2 }}>
//         תמונה {imageIndex + 1} מתוך {imageArray.length}
//       </Typography> */}
//     </Card>
//   );
// };

// // export default ImageCard;

// export default GraveDetils
