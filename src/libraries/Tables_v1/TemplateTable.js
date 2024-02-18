// import React, { useState, useEffect, createContext } from 'react'
// import Table from '@mui/material/Table'

// import { useTheme } from '@mui/system'
// import { makeStyles } from '@material-ui/styles'

// import HeaderTable from './layoutsTable/HeaderTable'
// import BadyTable from './layoutsTable/BadyTable'
// import FooterTable from './layoutsTable/FooterTable'
// import RowContextTable from './layoutsTable/RowContextTable'

// const GlobalContextTable = createContext()


// // const useStyles = makeStyles(
// //     {
// //     active: {
// //         // backgroundColor: '#1876D1',
// //         backgroundColor: '#D6F6FF',
// //       cursor: 'pointer',
// //     },
// //     noActive: {
// //       backgroundColor: 'none',
// //       cursor: 'pointer',
// //     },
// //     header: {
// //         fontWeight: 'bold',
// //         overflow: 'hidden', /* כדי לחבוי את התוכן שחורג מהגודל הקבוע */
// //         textOverflow: 'ellipsis', /* יציג נקודות אליפסיס אם הטקסט ארוך מדי לתיבה */
// //         // border: '1px #D6F6FF solid',
// //         // border: '1px #D6F6FF solid',
// //         marginBottom: 0, 
// //         marginTop: 0, 
// //         paddingBottom: 0,
// //         paddingTop: 0,
// //         fontSize: '25px'
// //     },
// //     noDefaultStyles: {
// //         background: 'inherit',
// //         color: 'inherit',
// //         fontSize: 'inherit',
// //         margin: 0,
// //         padding: 0
// //     },
// //     divider: {
// //         fontSize: '16px',
// //         margin: 0,
// //         padding: 0,
// //         width: '12px', /* רוחב המחיצה */
// //         cursor: 'col-resize' /* סמן העכבר כשנעמדים על המחיצה */
// //     },
// //     outerContainer: {
// //         width: '1000px',
// //         height: '800px',
// //         position: 'relative', // הוספת פוזישן רלטיב
// //         border: '5px solid aqua',
// //         overflow: 'scroll', // הוספת פרופרטי המוסיף את פס הגלילה
// //         overscrollBehavior: 'none'
// //         // overflow: 'hidden', // הסתרת פס גלילה חלקית
// //     },
// //   }
// //   )

// function TemplateTable (props) {
// const {
//     data = [],
//     columns = [],
//     pageSize = [],
//     checkboxSelection = false,
//     // disableSelectionOnClick  = true,
//     disableSelectionOnClick = false,
//     menuOptions = false,                   // תפריט בכפתור שמאלי על כל שורה
//     styleHeader={},                        // עיצוב כותרת
//     styleFooter={},                        // עיצוב תחתית
//     styleBody={},    
//     outgoingData = () => {} 
// } = props

// useEffect(() => {
//     console.log(disableSelectionOnClick)
// }, []);

// // סופר שורות רבות שנבחרו ע״י צ׳אקבוקס
// const [selectedRows, setSelectedRows] = useState([]) 
// const [totalPage, setTotalPage] = useState(pageSize || data.length);
// const [count, setCount] = useState(totalPage)
// const [focusPage, setFocusPage] = useState(Math.floor((count) / (pageSize || data.length)))
// const [countPage, setCountPage] = useState(Math.floor(data.length / (pageSize || data.length)) + 1)

// const theme = useTheme(); // כאן הוסף את זה

// const useStyles = makeStyles(() => (
//     {
//         cardRoot: {
//         width: 300,
//         height: 150,
//         margin: '10px',
//         position: 'relative',
//         backgroundColor: theme.palette.primary.main, // שימוש בצבע כחול מטריאל
//         boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
//         borderRadius: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         },
//         active: {
//             backgroundColor: '#1876D1',
//             backgroundColor: '#D6F6FF',
//             cursor: 'pointer',
//         },
//         noActive: {
//             backgroundColor: 'none',
//             cursor: 'pointer',
//         },
//         header: {
//             fontWeight: 'bold',
//             overflow: 'hidden', /* כדי לחבוי את התוכן שחורג מהגודל הקבוע */
//             textOverflow: 'ellipsis', /* יציג נקודות אליפסיס אם הטקסט ארוך מדי לתיבה */
//             // border: '1px #D6F6FF solid',
//             // border: '1px #D6F6FF solid',
//             marginBottom: 0, 
//             marginTop: 0, 
//             paddingBottom: 0,
//             paddingTop: 0,
//             fontSize: '25px'
//         },
//         noDefaultStyles: {
//             background: 'inherit',
//             color: 'inherit',
//             fontSize: 'inherit',
//             margin: 0,
//             padding: 0
//         },
//         divider: {
//             fontSize: '16px',
//             margin: 0,
//             padding: 0,
//             width: '12px', /* רוחב המחיצה */
//             cursor: 'col-resize' /* סמן העכבר כשנעמדים על המחיצה */
//         },
//         outerContainer: {
//             minWidth: '100%',
//             maxWidth: '5vw',
//             minHeight: '100%',
//             maxHeight: '10vh',
//             // maxHeight: '100%',
//             paddingLeft: 150,
//             // paddingTop:50,
//             // height: '800px',
//             position: 'relative', // הוספת פוזישן רלטיב
//             // border: '5px solid aqua',
//             // overflow: 'scroll', // הוספת פרופרטי המוסיף את פס הגלילה
//             overflowY: 'auto', overflowX: 'auto',
//             overscrollBehavior: 'none',
//             // overflow: 'hidden', // הסתרת פס גלילה חלקית
//         },
//         test: theme.test
//     }
//   ))

//     const classes = useStyles()
//     const [widthTable, setWidthTable] = useState(0)

//     const [testX, setTestX] = useState(0)
//     const [isResize, setIsResize] = useState(false)
    
//     const varibleGlobalTable = { 
//         data, columns, pageSize,
//         checkboxSelection,menuOptions,
//         count, setCount, 
//         focusPage, setFocusPage, 
//         countPage, setCountPage,
//         totalPage, setTotalPage,
//         selectedRows, setSelectedRows,
//         outgoingData,
//         disableSelectionOnClick,
//         styleHeader, styleFooter, styleBody,  
//         isResize, setIsResize, 
//         testX
//     }



//     // useEffect(() => {
//     //     let refTemp, tempRow = null
//     //     refTemp = Array(data.length).fill().map((_, i) =>  React.createRef())

//     //     if (data.length) {
//     //         tempRow = data.map((row, indexRow) => {
//     //             return <RowContextTable row={row} indexRow={indexRow} rowRef={rowRef} setRowRef={(r) => {
//     //                 refTemp = {...refTemp, [indexRow] : r}
//     //             }}/>
//     //           })
//     //     }
        
//     //     setRowRef(refTemp)
//     //     setRowData(tempRow)
//     // }, [data])

//     const styles = {
//         // all: 'unset',
//         width: '100%',
//         border: '2px solid red',
//         // whiteSpace: 'nowrap',
//         /* נוסיף כל הגדרות עיצוב נדרשות כאן */
//       };


//       const handleMouseMove = (event) => {
//         event.preventDefault()
//         const { clientX, clientY } = event;
//         if (isResize) {
//             setTestX(clientX)
//         }
//       }

//       const handleMouseUp = () => {
//         setIsResize(false)
//         setTestX(0)
//       };


//       const [adjustedHeight, setAdjustedHeight] = useState(0)
//       const calculateAdjustedHeight = () => {
//           const windowHeight = window.innerHeight;
//           const elementTop = document.getElementById('idTemplateTable').getBoundingClientRect().top
//           const newAdjustedHeight = windowHeight - elementTop
//           console.log(newAdjustedHeight)
//           setAdjustedHeight(newAdjustedHeight >= 0 ? newAdjustedHeight : 0)
//       }
//       useEffect(() => {
//             // קבע את הגובה מתאם כאשר הרכיב נטען
//             calculateAdjustedHeight();
    
//             // הוסף את האירוע לחישוב הגובה מתאם כאשר החלון משתנה
//             window.addEventListener('resize', calculateAdjustedHeight);
    
//             // ניקוי אירוע כאשר הרכיב יוסר
//             return () => {
//                 window.removeEventListener('resize', calculateAdjustedHeight);
//             }
//       }, []);



//     return (
//         <GlobalContextTable.Provider value={varibleGlobalTable}>
//             <div  
//             id = 'idTemplateTable'
//             style={{minHeight: adjustedHeight}}
//             className={classes.outerContainer}
//             >   
//             <Table dir="rtl" className={classes.test} style={{overflow: 'scroll', width: widthTable}} 
//             onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
//             >
//                 <HeaderTable />
//                 <BadyTable/>
//                 <FooterTable/>
//             </Table>
//             </div>
//         </GlobalContextTable.Provider>
//     );
//   }

//   export default TemplateTable;
//   export {
//     GlobalContextTable
//   }