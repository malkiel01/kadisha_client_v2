// import React, { useState } from 'react'
// import './Grid.css'
// import { Button, Container } from '@mui/material'
// import RowCreate from './rowCreate'
// import useQueries from '../../../../../database/useQueries'
// import { useContext } from 'react'
// import { GlobalContext } from '../../../../../App'
// import { useNavigate } from 'react-router-dom'
// import LoadingOverlay from '../../../../../libraries/loading/test3/LoadingOverlay'

// const Grid = ({ rows = [], plotId }) => {
//   const { addOrUpdateDataRow } = useQueries()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const { dataRows } = useContext(GlobalContext)
//   const sortedItems = rows.sort((a, b) => a.serialNumber - b.serialNumber)
//   const [items, setItems] = useState(sortedItems)
//   const [draggedIndex, setDraggedIndex] = useState(null)

//   const handleDragStart = (index) => {
//     setDraggedIndex(index)
//   }

//   const handleUpdateOrder = async () => {
//     // עדכון סדר שורות לא מומש
//     console.log('עדכון סדר שורות לא מומש');
//   }
  
  

//   const handleDrop = (index) => {
//     if (draggedIndex !== null) {
//       const newItems = [...items]
//       const draggedItem = newItems.splice(draggedIndex, 1)[0]
//       newItems.splice(index, 0, draggedItem)

//       // Update the serial numbers
//       const updatedItems = newItems.map((item, i) => ({
//         ...item,
//         serialNumber: i + 1,
//       }))

//       setItems(updatedItems)
//       setDraggedIndex(null)
//     }
//   }

//   return (
//     <Container>
//       <RowCreate items={items} setItems={setItems} plotId={plotId} />
//       <div className="grid-container">
//         {items.map((item, index) => (
//           <div
//             key={item.id}
//             className="grid-item"
//             draggable
//             onDragStart={() => handleDragStart(index)}
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => handleDrop(index)}
//           >
//             {`שורה:${item.lineNameHe}, מס׳:${item.serialNumber}`}
//           </div>
//         ))}
//       </div>
//       <Button variant="contained" color="primary" onClick={handleUpdateOrder} style={{ marginTop: '16px' }}>
//         עדכן סדר
//       </Button>

//       {loading && <LoadingOverlay />}
//     </Container>
//   );
// };

// export default Grid;
