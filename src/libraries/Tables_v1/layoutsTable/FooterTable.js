// import React, { useContext, useEffect } from 'react'

// import Select from '@mui/material/Select'
// import { IconButton, Menu, MenuItem } from '@mui/material'
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableRow';
// import { makeStyles } from '@material-ui/styles'
// import NavigateNextIcon from '@mui/icons-material/NavigateNext'
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
// import { GlobalContextTable } from '../TemplateTable';


// const useStyles = makeStyles({
//     active: {
//       backgroundColor: '#D6F6FF',
//       cursor: 'pointer',
//     },
//     noActive: {
//       backgroundColor: 'none',
//       cursor: 'pointer',
//     },
//     // header: {
//     //     fontWeight: 'bold',
//     //     overflow: 'hidden', /* כדי לחבוי את התוכן שחורג מהגודל הקבוע */
//     //     textOverflow: 'ellipsis', /* יציג נקודות אליפסיס אם הטקסט ארוך מדי לתיבה */
//     //     border: '1px #D6F6FF solid',
//     //     marginBottom: 0, 
//     //     marginTop: 0, 
//     //     paddingBottom: 0,
//     //     paddingTop: 0,
//     //     fontSize: '25px'
//     // },
//     noDefaultStyles: {
//         background: 'inherit',
//         color: 'inherit',
//         fontSize: 'inherit',
//         margin: 0,
//         padding: 0
//     },
//     divider: {
//         fontSize: '16px',
//         margin: 0,
//         padding: 0,
//         width: '12px', /* רוחב המחיצה */
//         cursor: 'col-resize' /* סמן העכבר כשנעמדים על המחיצה */
//     }
//   })

//     {/* שורת סיכום טבלה */}
//     function FooterTable() {
//         const { 
//             data, columns,
//             selectedRows, pageSize,
//             setTotalPage, totalPage, 
//             count, setCount, 
//             focusPage, setFocusPage, 
//             countPage, setCountPage,
//             styleFooter
//         } = useContext(GlobalContextTable)

//         useEffect(() => {
//             let temp = Math.floor((data.length - 1) / (pageSize || data.length)) + 1
//             !temp && (temp = Math.floor(data.length / (pageSize || data.length)) + 1)
//             setCountPage(temp)
//         }, [data]);
    
//         const handleChangePage = (event) => {
//             console.log(event);
//             setCount(event.target.value)
//             setTotalPage(event.target.value)
//             setCountPage(Math.floor(data.length / (event.target.value)) + 1)
//             setFocusPage(1)
//         }
//     const classes = useStyles()

//     const reductionTotalPage = () => {
//         setCount(totalPage)
//         setFocusPage(1)
//   }
//   const reductionPage = () => {
//     if (count > totalPage) {
//         setCount(count - totalPage)
//         setFocusPage(focusPage - 1)
//     }
//   }
//   const addPage = () => {
//     if (count < data.length) {
//         setCount(count + totalPage)
//         setFocusPage(focusPage + 1)
//     }
//   }
//   const addTotalPage = () => {
//         const quotient = Math.floor((data.length) / (totalPage))
//         setCount((quotient + 1) * totalPage)
//         setFocusPage(Math.floor(quotient) + 1)
//   }
        

// // 2 האופציות טובות - צריך לבדוק

//         return (
//             <tbody>
//                 <TableRow>
//                     <TableCell
//                     sx={(theme) => theme.header}
//                     style={{width: 10, ...styleFooter}} colSpan={columns.length + 1} align="right" className={`${classes.testStyle} ${classes.header}`}>
//                         <div style={{ alignItems: 'center', width: '100%', display: 'flex', textAlign: 'right', justifyContent: 'space-between' }}>
//                             <span style={{ width: '30%', minWidth: 110}}>
//                                 {selectedRows.length > 0 && <>
//                                     <span>{`\t` + 'נבחרו' + `\t`}</span>
//                                     <span>{selectedRows.length}</span>
//                                     <span>{`\t` + 'מתוך' + `\t`}</span>
//                                 </>}
//                                 <span>{data.length}</span>
//                                 <span>{`\t` + 'רשומות' + `\t`}</span>
//                             </span>
//                             <span style={{ width: '50%', minWidth: 380, textAlign: 'left' }}>
//                                 <div  style={{ display: 'inline-block' }}>
//                                     <Select 
//                                         style={{
//                                             backgroundColor: '#F0F8FF',
//                                             margin: 10, 
//                                             padding: 10 , 
//                                             minWidth: 100, 
//                                             maxWidth: 100, 
//                                             height: 40
//                                         }} 
//                                         defaultValue={pageSize} 
//                                         onChange={handleChangePage}
//                                         >
//                                         <MenuItem value={2}>2</MenuItem>
//                                         <MenuItem value={5}>5</MenuItem>
//                                         <MenuItem value={10}>10</MenuItem>
//                                         <MenuItem value={25}>25</MenuItem>
//                                         <MenuItem value={50}>50</MenuItem>
//                                         <MenuItem value={100}>100</MenuItem>
//                                         <MenuItem value={data.length > 5000 ? data.length : 5000}>הכל</MenuItem>
//                                     </Select> 
//                                 </div>
//                                 <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                         onClick={reductionTotalPage} disabled={pageSize === 0 || (count - totalPage) === 0}>
//                                     <KeyboardDoubleArrowRightIcon />
//                                 </IconButton>
//                                 <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                         onClick={reductionPage} disabled={pageSize === 0 || (count - totalPage) === 0}>
//                                     <NavigateNextIcon />
//                                 </IconButton>
//                                 <span>{focusPage}</span>
//                                 <span>{`\t` + `מתוך` + `\t`}</span>
//                                 <span>{countPage}</span>

                            
                            
//                                 <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                         onClick={addPage} disabled={pageSize === 0 || (data.length - count) <= 0}>
//                                     <NavigateBeforeIcon />
//                                 </IconButton>
//                                 <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                         onClick={addTotalPage} disabled={pageSize === 0 || (data.length - count) <= 0}>
//                                     <KeyboardDoubleArrowLeftIcon />
//                                 </IconButton>
//                             </span>
//                         </div>
//                     </TableCell>
//                 </TableRow>
//             </tbody>
//         )

//         return (
//             <TableRow>
//                 <TableCell style={{width: 10, ...styleFooter}} colSpan={columns.length + 1} align="right" className={`${classes.testStyle} ${classes.header}`}>
//                     <div style={{ alignItems: 'center', width: '100%', display: 'flex', textAlign: 'right', justifyContent: 'space-between' }}>
//                         <span style={{ width: '30%'}}>
//                             {selectedRows.length > 0 && <>
//                                 <span>{`\t` + 'נבחרו' + `\t`}</span>
//                                 <span>{selectedRows.length}</span>
//                                 <span>{`\t` + 'מתוך' + `\t`}</span>
//                             </>}
//                             <span>{data.length}</span>
//                             <span>{`\t` + 'רשומות' + `\t`}</span>
//                             <span></span>
//                             <span></span>
//                         </span>
//                         <span style={{ width: '50%', textAlign: 'left' }}>
//                             <div  style={{ display: 'inline-block'}}>
//                                 <Select 
//                                 style={{margin: 0, padding: 0 , minWidth: 100, height: 40}} 
//                                 defaultValue={5} 
//                                 // onChange={handleChangePage}
//                                 >
//                                 <MenuItem value={5}>5</MenuItem>
//                                 <MenuItem value={10}>10</MenuItem>
//                                 <MenuItem value={25}>25</MenuItem>
//                                 <MenuItem value={50}>50</MenuItem>
//                                 <MenuItem value={data.length}>הכל</MenuItem>
//                                 </Select>
//                             </div>
//                             <span>{`\t` + `שורות לעמוד` + `\t`}</span>
//                             {/* <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                     onClick={reductionTotalPage} disabled={pageSize === 0 || (count - totalPage) === 0}>
//                                 <KeyboardDoubleArrowRightIcon />
//                             </IconButton> */}
//                             {/* <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                     onClick={reductionPage} disabled={pageSize === 0 || (count - totalPage) === 0}>
//                                 <NavigateNextIcon />
//                             </IconButton> */}
//                             <span>{focusPage}</span>
//                             <span>{`\t` + `מתוך` + `\t`}</span>
//                             <span>{countPage}</span>

                        
                        
//                             {/* <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                     onClick={addPage} disabled={pageSize === 0 || (data.length - count) <= 0}>
//                                 <NavigateBeforeIcon />
//                             </IconButton>
//                             <IconButton aria-controls="three-dots-menu" aria-haspopup="true" 
//                                     onClick={addTotalPage} disabled={pageSize === 0 || (data.length - count) <= 0}>
//                                 <KeyboardDoubleArrowLeftIcon />
//                             </IconButton> */}
//                         </span>
//                     </div>
//                 </TableCell>
//             </TableRow>    
//         );
//     }

//     export default FooterTable