import React, { useState, createContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import HeaderTable from './layoutsTable/HeaderTable'
import BadyTable from './layoutsTable/BadyTable'
import FooterTable from './layoutsTable/FooterTable'
import { createTheme, ThemeProvider } from '@mui/material'
import { Card } from '@mui/material' 

const GlobalContextTable = createContext()

const themeTable = createTheme({
    titleTable: {
        fontSize: '1.5rem',
        color: '#475569',
        
        backgroundColor: '#E2E8F0',
        // backgroundColor: '#D1FAE4',
        // backgroundColor: '#F7FAFC',
    },
    titleTableHeader: {
        // backgroundColor: '#F7FAFC',
        // backgroundColor: '#D1FAE4',
        borderRadius: '50px',
        border: '2px solid red'

    },
    palette: {
        primary: {
          main: '#1976D2', // הצבע הראשי שלך
        },
        secondary: {
          main: '#FF4081', // הצבע המשני שלך
        },
      },
    typography2: {
    fontSize: 16, // גודל גופן ברירת המחדל
    fontFamily: 'Roboto, sans-serif', // גופן ברירת המחדל
    },
    
  });
  
const ParentDiv = ({ children }) => (
    <div
        style={{
        overflow: 'scroll',
        maxHeight: '49vh',
        width: '100%',
        position: 'relative',
        }}
    >
        {children}
    </div>
);

function TemplateTable (props) {
    const {
        data = [],
        setData = () => {},
        items = [],
        columns = [],
        pageSize = [],
        checkboxSelection = false,
        disableSelectionOnClick = false,
        menuOptions = false,                   // תפריט בכפתור שמאלי על כל שורה
        styleHeader={},                        // עיצוב כותרת
        styleFooter={},                        // עיצוב תחתית
        styleBody={},    
    } = props


    // סופר שורות רבות שנבחרו ע״י צ׳אקבוקס
    const [selectedRows, setSelectedRows] = useState([]) 
    const [totalPage, setTotalPage] = useState(pageSize || data.length);
    const [count, setCount] = useState(totalPage)
    const [focusPage, setFocusPage] = useState(Math.floor((count) / (pageSize || data.length)))
    const [countPage, setCountPage] = useState(Math.floor(data.length / (pageSize || data.length)) + 1)

    const useStyles = makeStyles(() => (
        {
            outerContainer: {
                minWidth: '100%',
                maxWidth: '5vw',
                minHeight: '100%',
                maxHeight: '50vh',
                paddingLeft: 150,
                position: 'relative', // הוספת פוזישן רלטיב
                overflowY: 'auto', overflowX: 'auto',
                overscrollBehavior: 'none',
            }
        }
    ))

    const classes = useStyles()

    const [isResize, setIsResize] = useState(false)
    
    const varibleGlobalTable = { 
        data, setData, items, columns, pageSize,
        checkboxSelection,menuOptions,
        count, setCount, 
        focusPage, setFocusPage, 
        countPage, setCountPage,
        totalPage, setTotalPage,
        selectedRows, setSelectedRows,
        disableSelectionOnClick,
        styleHeader, styleFooter, styleBody,  
        isResize, setIsResize, 
    }

    return (
        <GlobalContextTable.Provider value={varibleGlobalTable}>
            <ThemeProvider theme={themeTable}>
                <div className={classes.outerContainer}>  
                    <Card style={{borderRadius: '14px', display: 'inline-block'}}>
                        <ParentDiv>
                            <table>
                                <HeaderTable />
                                <BadyTable/>
                                <FooterTable/>
                            </table>
                        </ParentDiv>
                    </Card>
                </div>
                {/* <CustomToolbarGrid/> */}
            </ThemeProvider>
        </GlobalContextTable.Provider>
    )
  }

  export default TemplateTable
  export {
    GlobalContextTable
  }