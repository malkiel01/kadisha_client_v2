// import React, { useContext, useState } from 'react';
// import { AppBar, Box, Card, Grid, Chip, Input, ListItem, Tooltip, Button } from '@mui/material'
// import BoltIcon from '@mui/icons-material/Bolt'
// import ColumnHeaderTable from './columnHeaderTable';
// import { GlobalContextTableCard } from './table';

// const HeaderTable = () => {
//     const { data, myColumns, setMyColumns } = useContext(GlobalContextTableCard)

//     const [width, setWidth] = useState(160);
//     const [isResizing, setIsResizing] = useState(false);
//     const [startX, setStartX] = useState(0);
  
//     const handleMouseDown = (e) => {
//       setIsResizing(true);
//       setStartX(e.clientX);
//     };
  
//     const handleMouseUp = () => {
//       setIsResizing(false);
//     };
  
//     const handleMouseMove = (e) => {
//       if (!isResizing) return;
//       const newWidth = width - e.clientX + startX;
//       setWidth(newWidth);
//       setStartX(e.clientX);
//     };

    



//     return (
//         <Grid container style={{ display: 'flex', flexWrap: 'nowrap'}}>
//             {Array.isArray(myColumns) && myColumns.map((column, key) => {
//                 return <Tooltip title="פעולות מרוכזות" arrow>
//                     <ColumnHeaderTable id={key} column={column} width={width} setWidth={setWidth} />
//                 </Tooltip>
//             })}
//             {/* <Tooltip title="פעולות מרוכזות" arrow>
//                 <ColumnHeaderTable width={width} setWidth={setWidth} />
//             </Tooltip>
//             <Tooltip title="פעולות מרוכזות" arrow>
//                 <Card style={{
//                     minWidth: '160px',
//                     borderRadius: '0',
//                     backgroundColor: '#F7FAFC'
//                 }}>
//                     <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
//                     // backgroundColor: '#fff'
//                     background: 'none'
//                     }}><BoltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
//                 </Card>
//             </Tooltip>
//             <Tooltip title="פעולות מרוכזות" arrow>
//                 <Card style={{
//                     minWidth: '160px',
//                     borderRadius: '0',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     backgroundColor: '#F7FAFC'
//                 }}>
//                     <span style={{
//                     margin: '5px'}}>test</span>
//                     <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none',  
//                     // backgroundColor: '#fff'
//                     background: 'none'
//                     }}><BoltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
//                 </Card>
//             </Tooltip>
//             <Tooltip title="פעולות מרוכזות" arrow>
//                 <Card style={{
//                     minWidth: '160px',
//                     borderRadius: '15px 0 0 0',
//                     backgroundColor: '#F7FAFC'
//                 }}>
//                     <button style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
//                     // backgroundColor: '#fff'
//                     background: 'none'
//                     }}><BoltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
//                 </Card>
//             </Tooltip> */}
//         </Grid>
//     );
// }

// export default HeaderTable;
