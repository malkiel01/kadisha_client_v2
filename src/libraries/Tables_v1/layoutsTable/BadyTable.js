// import React, { useRef, useEffect, useContext } from 'react'
// import { TableBody, TableCell, TableRow } from '@material-ui/core'
// import CloudOffIcon from '@mui/icons-material/CloudOff';
// import { makeStyles } from '@material-ui/styles'
// import Typography from '@mui/material/Typography'
// import { GlobalContextTable } from '../TemplateTable'
// import RowContextTable from './RowContextTable';

// const useStyles = makeStyles({
//   focused: {
//     border: '10px solid red',
//     transition: 'background-color 0.3s',
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: 'rgba(214, 246, 255, 0.3)', // רקע כחול חצי-שקוף
//       cursor: 'pointer',
//       border: '3px solid rgba(0, 0, 255, 0.2)', // שינוי צבע הבורדר לכחול ושקוף
//     },
//     '&:active': {
//       backgroundColor: '#97E6FD',
//     }
//   },
//   active: {
//     backgroundColor: '#D6F6eF',
//     '&:hover': {
//       backgroundColor: '#97E6FD',
//     }
//   },
//   test: {
//     border: '10px solid red'
//   },
//   iconTypographyEmptyTableStyle: {
//       width: '200px',
//       minHeight: '200px',
//       opacity: '0.5',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//   },
//   iconEmptyTableStyle: {
//     width: '200px',
//     minHeight: '200px',
//     opacity: '0.5',
//   },
// })
  
// export const RowTable = () => {
//   const { data, selectedRows, setSelectedRows, checkboxSelection } = useContext(GlobalContextTable)
//   const classes = useStyles()

//   // משתנה המקבל רפים של כל שורה מתוך הטבלה
//   const rowRefs = useRef(Array(data.length).fill().map(() => React.createRef()))
//   // אינדקס למיקום השורה האחרונה שהייתה בפוקוס
//   const currentIndex = useRef(-1)
//   // יצירת מיקו ריק לשמירת רפים לכל השורות והטמעה במשתנה לשמירה
//   useEffect(() => {
//       // לעדכן את ה-refs כאשר משתנה ה-data
//       rowRefs.current = Array(data.length).fill().map(() => React.createRef());
//   }, [data]);
//   // כל שורה קוראת לפונקציה ושומרת רף אישי במערך הרפים
//   const handleSetRowRef = (index, ref) => {
//     rowRefs.current[index] = ref;
//   };
//   const handleKey = (event, index, row) => {
//     console.log(event.key);

//   switch (event.key) {
//       case 'ArrowDown':
//         handleKeyUpDown(row.id, true)
//         break;
//       case 'ArrowUp':
//         handleKeyUpDown(row.id, false)
//         break;
//       case ' ':
//       case 'Enter':
//       ClickKeyEnter(row)
//         break;
//       // case value:
        
//       //   break;
//       // case value:
        
//       //   break;
    
//       default:
//         break;
//     }

//   }

//   // פונקציה בעת לחיצה על כפתור חצים מעלה ומטה במקלדת
//   const handleKeyUpDown = (index, nextOrPrev) => {
//     (currentIndex.current === -1) && (currentIndex.current = index)

//     if (currentIndex.current < rowRefs.current.length - 1) {
//       const nextElement = getNextNonNullElement(currentIndex, rowRefs, data, nextOrPrev)
//         if (nextElement) {      
//           rowRefs.current[currentIndex.current].classList.remove(classes.active)
//           nextElement.ref.classList.add(classes.active)
//           currentIndex.current = nextElement.data[0].id
//         }
//     }
//   }

//   const ClickKeyEnter = (row) => {
//     handleRowSelect(currentIndex.current)
//   }

//    // בחירת שורה
//  const handleRowSelect = (rowId) => {
//   if (rowId !== null) {
//       if (checkboxSelection) {
//           if (selectedRows.includes(rowId)) {
//               setSelectedRows(selectedRows.filter((id) => id !== rowId))
//               return selectedRows.filter((id) => id !== rowId)
//             } else {
//               setSelectedRows([...selectedRows, rowId])
//               return [...selectedRows, rowId]
//             }
//       } else {
//           setSelectedRows([rowId])
//           return [rowId]
//       }
//   } else {
//       return selectedRows
//   }
//   }

//   const getNextNonNullElement = (currentIndex, rowRefs, data, nextOrPrev) => {
//     if (nextOrPrev) {
//       for (let i = currentIndex.current + 1; i < rowRefs.current.length; i++) {
  
//         const currentRef = rowRefs.current[i];
//         if (currentRef !== (null || undefined) && currentRef?.current === undefined) {
          
//           return { ref: currentRef, data: data.filter((item) => item.id === i) };
//         }
//       }
//     } else {  
      
//       for (let i = currentIndex.current - 1; i > 0; i--) {

//         const currentRef = rowRefs.current[i];
//         if (currentRef !== (null || undefined) && currentRef?.current === undefined) {
          
//           return { ref: currentRef, data: data.filter((item) => item.id === i) };
//         }
//       }
//     }

//     return null;
//   }

//   // מכאן כל הפונקציות לא שימושיות לשלב זה
//   // const ClickKeyArrowDown = () => {
//   //   // let count = currentIndex2.current + 1

//   //   // if (currentIndex2.current < rowRef.length - 1) {
//   //   //   setCurrentIndex2(count)
//   //   //   console.log(rowRef[count]);
//   //   //   rowRef[count].focus();
//   //   //   rowRef[count - 1].classList.remove(classes.test);
//   //   //   rowRef[count].classList.add(classes.test)
//   //   // }




//   //   // const currentIndex = data.findIndex((myData) => myData.id === indexRow)
//   //   // console.log('currentIndex: ',currentIndex, ', - indexRow: ',indexRow)
//   //   // console.log('rowRef: ',rowRef)
//   //   // console.log('rowRef[indexRow]: ',rowRef[indexRow])
//   //   // console.log('rowRef[indexRow + 1]: ',rowRef[indexRow + 1])
//   //   // const nextIndex = rowRef.findIndex((ref, index) => index > currentIndex && ref !== null)
//   //   // console.log(nextIndex, rowRef[nextIndex])
//   //   // gg()
//   //   // let nextIndex = indexRow + 1
//   //   // console.log(indexRow, nextIndex)
//   //   // console.log(rowRef)
//   //   // // console.log(rowRef.filter((data, index) => index === nextIndex))
//   //   // if (nextIndex < data.length) {
//   //   // //         // console.log(nextIndex, currentIndex )
//   //   // //         // console.log(rowRef)
//   //   // //     // rowRef, setrowRef
//   //   // //     // console.log(rowRef.current[currentIndex])
//   //   // //     // console.log(rowRef.current[nextIndex]) // למה אני לא מקבל אותו וזה יוצא undifind
//   //   // // // הוספת הקלאס "focused" לדיב הנוכחי באמצעות makeStyles

//   //   // // // setCurrentIndex(nextIndex);
//   //   // }
//   // }

//   // const ClickKeyArrowUp = () => {
//   //   // let prevIndex = indexRow - 1
//   //   // console.log(indexRow, prevIndex)
//   //   // if (nextIndex >= 0) {
//   //   //     // console.log(nextIndex, currentIndex )
//   //   //     // console.log(rowRef)

//   //   // // הוספת הקלאס "focused" לדיב הנוכחי באמצעות makeStyles
//   //   // // divRefs.current[currentIndex].current.classList.remove(classes.focused);
//   //   // // divRefs.current[nextIndex].current.classList.add(classes.focused)
//   //   // // setCurrentIndex(nextIndex);
//   //   // }
//   // }

//   // const ClickKeyArrowDownAndShift = () => {
//   //   const nextArr =  []
//   //   for (let i = currentIndex; i < data.length; i++) {
//   //       nextArr.push(data[i].id)   
//   //   }
//   //   setSelectedRows(nextArr)
//   // }

//   // const ClickKeyArrowUpAndShift = () => {
//   //   const nextArr =  []
//   //   for (let i = currentIndex; i >= 0; i--) {
//   //       nextArr.push(data[i].id)   
//   //   }
//   //   setSelectedRows(nextArr)
//   // }

//   // const ClickKeyCtrlAndA = () => {
//   //   let items = []
//   //   data.forEach(row => {
//   //       items.push(row.id)
//   //   })
//   //   setSelectedRows(items)
//   // }

//   return (
//     data.map((row, indexRow) => (
//       <RowContextTable
//           key={indexRow}
//           indexRow={indexRow}
//           row={row}
//           rowRef={rowRefs.current}
//           setRowRef={(r) => handleSetRowRef(row.id, r)}
//           handleKey={(event) => handleKey(event,indexRow, row)}

//       />
//       ))
//   )
// }

// export const EmptyTable = () => {
//   const { columns } = useContext(GlobalContextTable)
//   const classes = useStyles()
//   return (
//     <TableRow className="container" style={{border: '1px #D6F6FF solid', minWidth: '100%',}}>
//       <TableCell colSpan={columns.length + 1} style={{border: '1px #D6F6FF solid', minWidth: '100%', width: '100%'}}>
//           <Typography variant="body1" style={{border: '1px #D6F6FF solid', minWidth: '100%', width: '100%'}} className={`${classes.iconTypographyEmptyTableStyle} material-icons`}>
//           <CloudOffIcon className={`${classes.iconEmptyTableStyle}`} style={{ fontSize: '150px' }} />
//           </Typography>
//       </TableCell>
//       </TableRow>
//   );
// }

// const BadyTable = () => {
//   const { data } = useContext(GlobalContextTable)
//   return ( 
//     <TableBody onContextMenu={(event) => {event.preventDefault()}}>
//       {data.length ? <RowTable/> : <EmptyTable/>}
//     </TableBody>
//   )  
// }
  
// export default BadyTable


  
  
  
  
  