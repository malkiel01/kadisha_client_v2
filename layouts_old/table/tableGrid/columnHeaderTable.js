// import React, { useContext, useState } from 'react';
// import { Card } from '@mui/material';
// import BoltIcon from '@mui/icons-material/Bolt';
// import { GlobalContextTableCard } from './table';

// const ColumnHeaderTable = ({ id, column }) => {
//   const { data, myColumns, setMyColumns } = useContext(GlobalContextTableCard)

//   const [width, setWidth] = useState(column.width)

//   const [isResizing, setIsResizing] = useState(false);
//   const [startX, setStartX] = useState(0);

//   const handleMouseDown = (e) => {
//     setIsResizing(true);
//     setStartX(e.clientX);
//   };

//   const handleMouseUp = () => {
//     setIsResizing(false);
//   };

//   const handleMouseMove = (e) => {
//     if (!isResizing) return;
//     const newWidth = width - e.clientX + startX;
//     setWidth(newWidth);
//     setStartX(e.clientX)
//     setMyColumns(col => [...col])
    
//   };

//   const cardStyle = {
//     width: `${width}px`,
//     display: 'flex',
//     alignItems: 'center',
//     position: 'relative',
//     borderRadius: id === 0 ? '0 15px 0 0' : '', // נבדוק אם ה-id הוא 0 ונחליט האם להחיל את העיצוב
//     backgroundColor: '#F7FAFC',
//   };

//   return (
//     <Card style={cardStyle}>
//       <button
//         style={{
//           margin: '5px',
//           borderRadius: '5px',
//           minWidth: '50px',
//           border: 'none',
//           background: 'none',
//         }}
//       >
//         <BoltIcon sx={{ fontSize: 30, color: '#1B4C53', backgroundColor: 'none' }} />
//       </button>
//       {column?.headerName}
//       {/* {JSON.stringify(column.headerName)} */}
//       <div
//         style={{
//           width: '30px',
//           height: '60px',
//           position: 'absolute',
//           border: '1px solid blue',
//           top: '0',
//           left: '-5px',
//           cursor: 'col-resize',
//         }}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseUp}
//       ></div>
//     </Card>
//   );
// };

// export default ColumnHeaderTable;
