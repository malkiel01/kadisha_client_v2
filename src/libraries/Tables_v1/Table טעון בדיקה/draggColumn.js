// import React, { useState, useEffect } from 'react'
// import { makeStyles } from '@material-ui/styles'
// import { TableCell } from '@material-ui/core'
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

// const useStylesDragg = makeStyles({
//     draggableBox: {
//         width: '300px',
//         height: '100px',
//         backgroundColor: '#f0f0f0',
//         // border: '1px solid red',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s ease',
//       },
      
//       draggableBox: {
//         backgroundColor: '#ccc',
//       },
//       dragging: {
//         backgroundColor: '#ccc',
//       },
//       innerBox: {
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//   });

  
// function DraggableColumn( { column, updateColumn, setWidth1 } ) {

//     //   ------------------------------------------------------------------
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0)
//     const [width, setWidth] = useState(column.width)
//     // const [width, setWidth] = useState(column().width)

//     useEffect(() => {
//       console.log('start')
//     }, []);

//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         setStartX(e.clientX)
//       };
    
//       const handleMouseMove = (e) => {
//         if (isDragging) {
//               setStartX(e.clientX)
//               let newWidth = width - (e.clientX - startX)
//               setWidth(newWidth)
//               // updateColumn({...column, width: newWidth})
//               setWidth1(newWidth)
//         }
//       };
    
//       const handleMouseUp = () => {
//         setIsDragging(false);
//       };
    
//       const handleMouseLeave = () => {
//         setIsDragging(false);
//       };

//       // const test = (e) => {
//       //   let newWidth = width + 100
//       //   updateColumn({...column, width: newWidth})
//       //   console.log(column);
//       // };
//     //   ------------------------------------------------------------------

// return (
//     <TableCell 
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseLeave} 
//         // onClick={test}
//         style={{ width: 1, margin:0, padding:0 ,position: 'relative', left:13, top: -13, cursor: 'pointer'}}>
//             <DragIndicatorIcon style={{ position: 'absolute' }} />
//     </TableCell>
// )
// }

// export default DraggableColumn