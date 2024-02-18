// import React, { useEffect, useState } from 'react';
// import './FormCard.css'; // אנא וודא שיש לך קובץ CSS עם העיצוב הדרוש
// import { Card, Grid } from '@material-ui/core';
// import MultipleSelectChip from '../inputs/select/MultiSelect';
// import SelectPersonal from '../inputs/select/Select';
// import CustomInput from '../inputs/input/CustomInput';
// import { useTheme } from '@mui/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import CustemButton from '../inputs/CustemButton/CustemButton';
// // import { useTheme } from '@mui/material/styles';


// const data = [
//   {id: 0, name: 'שם בית העלמין'},
// ]

// const FormCard = () => {
//   const theme = useTheme();
//   const [data, setData] = useState()
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down(1000))

//   useEffect(() => {
//     console.log(theme.breakpoints)
//   }, [isSmallScreen])

  
//   const cardStyle = {
//     maxWidth: '1700px', // מגבלת את הרוחב המקסימלי ל-700 פיקסלים
//     width: '100%', // גורם לכרטיס להתפשט לרוחב האלמנט המכיל
//     margin: 'auto', // ממרכז את הכרטיס
//     padding: '20px 90px 20px 100px',
//     ...(isSmallScreen && { padding: '10px 10px 10px 20px' }), // עבור מסכים קטנים מ-700 פיקסלים, הכרטיס יתפוס 100% מהרוחב
//   }

//   return (
//     <Card container style={cardStyle} >
//       <Grid container spacing={2}>
//           <Grid item xs={12} sm={12} md={6} xl={3}>
//             <CustomInput name={'שם בית העלמין'} data={data} setData={setData}/>
//           </Grid>
//           <Grid item xs={12} sm={12} md={6} xl={3}>
//             <CustomInput name={'שם בית העלמין באנגלית'} data={data} setData={setData}/>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} xl={2}>
//             <CustomInput name={'קוד בית העלמין'} data={data} setData={setData}/>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} xl={2}>
//             <CustomInput name={'קוד ביטוח לאומי'} data={data} setData={setData}/>
//           </Grid>
//           <Grid item xs={12} sm={12} md={4} xl={2}>
//             <SelectPersonal name={'סוג בית עלמין'} value={'Van Henry'} data={[
//                 'Oliver Hansen',
//                 'Van Henry',
//                 'April Tucker',
//                 'Ralph Hubbard',
//                 'Omar Alexander',
//                 'Carlos Abbott',
//                 'Miriam Wagner',
//                 'Bradley Wilkerson',
//                 'Virginia Andrews',
//                 'Kelly Snyder',
//               ]} setValue={(e) => console.log('111',e)}/>
//           </Grid>
//           <Grid item xs={12} sm={12} md={8} xl={4}>
//             <CustomInput name={'קואורדינטות'} data={data} setData={setData}/>
//           </Grid>
//           <Grid item xs={12} sm={12} md={4} xl={4}>
//             <MultipleSelectChip name={'אחראי בית עלמין'} value={['Omar Alexander']} data={[
//                 'Oliver Hansen',
//                 'Van Henry',
//                 'April Tucker',
//                 'Ralph Hubbard',
//                 'Omar Alexander',
//                 'Carlos Abbott',
//                 'Miriam Wagner',
//                 'Bradley Wilkerson',
//                 'Virginia Andrews',
//                 'Kelly Snyder',
//               ]} setValue={(e) => console.log('111',e)}/>
//           </Grid>
//           <Grid item xs={1}>
//               <CustemButton name={'עדכן'} />
//           </Grid>

//       </Grid>
//     </Card>
//   )


//   return (
//     <div className="form-card">
//       <form>
//         <div className="form-group">
//           <label htmlFor="photo">תמונה</label>
//           <input type="file" id="photo" name="photo" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">שם</label>
//           <input type="text" id="name" name="name" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">תיאור</label>
//           <textarea id="description" name="description"></textarea>
//         </div>
//         {/* יש להוסיף פה את שאר השדות שבטופס לפי הצורך */}
//         <button type="submit">שלח</button>
//       </form>
//     </div>
//   );
// };

// export default FormCard;
