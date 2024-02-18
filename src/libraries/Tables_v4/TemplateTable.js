import React, { useState, useRef, createContext, useContext } from 'react';
import { Table, TableContainer, Paper, Card, } from '@material-ui/core'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles'
import Footer from './pieces/footer';
import Header from './pieces/header';
import Content from './pieces/content';
import { GlobalContext } from '../../App';
import { useSelector } from 'react-redux';


const GlobalContextTable = createContext()

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    fontSmall: {
        fontSize: '2.2rem', // הוספת שורה זו לשינוי גודל הפונט
    },
    checkbox: {
        color: '#19857b',
        '& svg': {
            fontSize: 25,
        },
    },
    activeRow: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
    },
    focusedRow: {
        // Target the row when it's both focused and selected
        '&.MuiTableRow-root.Mui-selected': {
            backgroundColor: 'rgba(255, 0, 0, 0.5)', // Your custom focus style
        },
        // הוספת סגנון ל-hover
        '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.5)', // סגנון כאשר העכבר מעל השורה
        },
    },
    outerContainer: {
        minWidth: '100%',
        maxWidth: '5vw',
        minHeight: '100%',
        maxHeight: '50vh',
        // paddingLeft: 150,
        position: 'relative', // הוספת פוזישן רלטיב
        overflowY: 'auto', overflowX: 'auto',
        overscrollBehavior: 'none',
    }
})

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
    },
    typography: {
        fontSize: 20, // גודל פונט בסיסי לכל האפליקציה
    },
})

function TemplateTable(props) {
    const {
        onClickRows = () => { },
        data,
        // setData = () => {},
        // items = [],
        columns = [],
        // pageSize = [],
        // checkboxSelection = false,
        // disableSelectionOnClick = false,
        // menuOptions = false,                   // תפריט בכפתור שמאלי על כל שורה
        // styleHeader={},                        // עיצוב כותרת
        // styleFooter={},                        // עיצוב תחתית
        // styleBody={},    
    } = props

    // עיצוב מותאם
    const classes = useStyles()

    // checkbox ----------------------------------------------------------------------------------------
    // סופר שורות רבות שנבחרו ע״י צ׳אקבוקס
    const [selectedRows, setSelectedRows] = useState([])

    // מספר הרשומות המוצגות בטבלה
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const clickSelectedRows = (e) => {
        onClickRows(e)
    }

    // שומר אלמנט ספציפי
    const tableRef = useRef()

    const [isResize, setIsResize] = useState(false)

    const varibleGlobalTable = {
        data, columns,
        // setData, items, 
        // pageSize,
        // checkboxSelection,
        // menuOptions,
        // count, setCount, 
        // focusPage, setFocusPage, 
        // countPage, setCountPage,
        // totalPage, setTotalPage,
        selectedRows, setSelectedRows,
        // disableSelectionOnClick,
        // styleHeader, styleFooter, styleBody,  
        isResize, setIsResize,
        rowsPerPage, setRowsPerPage,
        selectedRows, setSelectedRows,
        clickSelectedRows,
        tableRef,
        classes
    }

    return (
        <GlobalContextTable.Provider value={varibleGlobalTable}>
            <ThemeProvider theme={theme}>
                <Card>
                    <div className={classes.outerContainer}>
                        <div style={{ display: 'inline-block' }}>
                            <TableContainer
                                // component={Paper} 
                                ref={tableRef}>
                                <Table aria-label="simple table" style={{ fontSize: '50px' }}>
                                    <Header />
                                    <Content />
                                    <Footer />
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </Card>
            </ThemeProvider>
        </GlobalContextTable.Provider>
    )
}

export default TemplateTable
export {
    GlobalContextTable
}

// const handleKeyDown = (event) => {
//     if (event.key === 'Tab') {
//         event.preventDefault(); // מניעת התנהגות ברירת המחדל של טאב
//         const newIndex = event.shiftKey ? focusedRowIndex - 1 : focusedRowIndex + 1;
//         setFocusedRowIndex((newIndex + jsonData.length) % jsonData.length); // עדכון תוך כדי טיפול בגלילה מחוץ לגבולות
//     }
// };