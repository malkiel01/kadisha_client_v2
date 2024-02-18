// import { Card } from '@mui/material';
// import React, { useState } from 'react';

// function ResizableCard() {
//   const [width, setWidth] = useState(150);
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
//     setStartX(e.clientX);
//   };

//   return (
//     <Card
//       style={{
//         width: `${width}px`,
//         height: '60px',
//         display: 'flex',
//         alignItems: 'center',
//         border: '1px solid red',
//         position: 'relative',
//       }}
//     >
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
//       Content
//     </Card>
//   );
// }

// export default ResizableCard;
