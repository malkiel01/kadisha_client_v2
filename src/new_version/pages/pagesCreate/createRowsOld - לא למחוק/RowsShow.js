// import React, { useState, useEffect, useMemo } from 'react';
// import { Container, Button, Typography, Paper, ListItem, ListItemText, Card } from '@mui/material';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import useQueries from '../../../../database/useQueries';
// import RowCreate from './rowCreate';
// import PropTypes from 'prop-types';
// import './Grid.css';

// const RowsShow = ({ rows = [] }) => {
//   const { setRows } = useQueries();
//   const sortedItems = useMemo(() => rows.sort((a, b) => a.serialNumber - b.serialNumber), [rows]);
//   const [items, setItems] = useState(sortedItems);
//   const [draggedItems, setDraggedItems] = useState([...items]);

//   useEffect(() => {
//     setDraggedItems([...items]);
//   }, [items]);

//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedItems = Array.from(draggedItems);
//     const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
//     reorderedItems.splice(result.destination.index, 0, reorderedItem);

//     const updatedItems = reorderedItems.map((item, index) => ({
//       ...item,
//       serialNumber: index + 1,
//     }));

//     setDraggedItems(updatedItems);
//     setItems(updatedItems);
//   };

//   const handleUpdateOrder = () => {
//     const temp = draggedItems.sort((a, b) => a.serialNumber - b.serialNumber);
//     setItems(temp);
//     setRows(temp);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         רשימת השורות
//       </Typography>
//       <Card sx={{ width: '95%', height: 'auto', margin: '0 auto', padding: '16px' }}>
//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="items" direction="horizontal">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef} className="grid-container">
//                 {draggedItems.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="grid-item"
//                         style={{
//                           ...provided.draggableProps.style,
//                           backgroundColor: snapshot.isDragging ? '#e0e0e0' : '#fff',
//                         }}
//                       >
//                         <ListItemText primary={`שורה: ${item.lineNameHe}`} />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </Card>
//       <Button variant="contained" color="primary" onClick={handleUpdateOrder} style={{ marginTop: '16px' }}>
//         עדכן סדר
//       </Button>

//       <Typography variant="h6" gutterBottom style={{ marginTop: '24px' }}>
//         הוסף רשומה חדשה
//       </Typography>
//       <RowCreate items={items} setItems={setItems} />
//     </Container>
//   );
// };

// RowsShow.propTypes = {
//   rows: PropTypes.array.isRequired,
// };

// export default RowsShow;
