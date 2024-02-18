// import React, { createContext, useState } from 'react';
// import { Card, Grid } from '@mui/material'
// import HeaderTable from './headerTable';
// import ContainerTable from './containerTable';
// import FooterTable from './footerTable';

// export const GlobalContextTableCard = createContext()

// const Table = (props) => {
//     const {data, columns} = props

//     const [myColumns, setMyColumns] = useState(columns);

//     const varibleGlobalTableCard = {
//         data, myColumns, setMyColumns
//       }


//     return (
//         <GlobalContextTableCard.Provider value={varibleGlobalTableCard}>
//             <div style={{margin: '20px'}}>
//             <Grid container style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
//                     <Grid item>
//                             <HeaderTable/>
//                             <ContainerTable/>
//                             <Grid container style={{ display: 'flex', flexWrap: 'nowrap'}}>
//                             {[...Array(10)].map((_, index) => (
//                                     <Grid item key={index}>
//                                     <Card style={{ width: 250, height: 150, marginRight: 8 }}>
//                                         התוכן שבתוך הכארד
//                                     </Card>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                             <Grid container style={{ display: 'flex', flexWrap: 'nowrap'}}>
//                             {[...Array(10)].map((_, index) => (
//                                     <Grid item key={index}>
//                                     <Card style={{ width: 250, height: 150, marginRight: 8 }}>
//                                         התוכן שבתוך הכארד
//                                     </Card>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <FooterTable/>
//             </div>
//         </GlobalContextTableCard.Provider>
//     );
// }

// export default Table;
