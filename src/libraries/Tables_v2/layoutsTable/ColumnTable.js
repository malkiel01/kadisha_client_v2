import React, { useState, useContext, useEffect } from 'react'
import { TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CompressSharpIcon from '@mui/icons-material/CompressSharp'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import { GlobalContextTable } from '../TemplateTable'
import OpenMenuTable from '../plaginTable/OpenMenuTable';


const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: '#D6F6FF',
    cursor: 'pointer',
  },
  noActive: {
    backgroundColor: 'none',
    cursor: 'pointer',
  },
  header: {
      fontWeight: 'bold',
      overflow: 'hidden', /* כדי לחבוי את התוכן שחורג מהגודל הקבוע */
      textOverflow: 'ellipsis', /* יציג נקודות אליפסיס אם הטקסט ארוך מדי לתיבה */
      border: '1px #D6F6FF solid',
      fontSize: '25px',
      color: false ? "primary" : '#FFF'
  },
  noDefaultStyles: {
      background: 'inherit',
      color: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      padding: 0
  },
  customCursor: {
    cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" transform="rotate(90)"><path d="M10,11c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm-8,0c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm11,1c0,.552,.448,1,1,1s1-.448,1-1-.448-1-1-1-1,.448-1,1Zm-7-1c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm16,0c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm-4,0c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1ZM8.707,5.293l2.293-2.293v5c0,.552,.447,1,1,1s1-.448,1-1V3l2.293,2.293c.195,.195,.451,.293,.707,.293s.512-.098,.707-.293c.391-.391,.391-1.023,0-1.414L13.414,.586c-.779-.78-2.049-.78-2.828,0l-3.293,3.293c-.391,.391-.391,1.023,0,1.414s1.023,.391,1.414,0Zm6.586,13.414l-2.293,2.293v-5c0-.552-.447-1-1-1s-1,.448-1,1v5l-2.293-2.293c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l3.293,3.293c.39,.39,.902,.585,1.414,.585s1.024-.195,1.414-.585l3.293-3.293c.391-.391,.391-1.023,0-1.414s-1.023-.391-1.414,0Z" /></svg>')15 15, auto`
  },
  divider: {
      fontSize: '16px',
      margin: 0,
      padding: 0,
      width: '12px', /* רוחב המחיצה */
      cursor: 'col-resize' /* סמן העכבר כשנעמדים על המחיצה */
  },
  rotatedIcon: {
    transform: 'rotate(90deg)', // סיבוב 180 מעלות
  },
  grab: {
    cursor: 'grab'
  }
}))

const ColumnTable = ({ column }) => {

    const { menuOptions, testX,
      isResize, setIsResize,
    } = useContext(GlobalContextTable)

    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
      if (isDragging && isResize) {
          let newWidth = width - (testX - startX)
          if (newWidth > 70) {
            setStartX(testX)
            setWidth(newWidth)
          } else {
            setIsResize(false)
            setIsDragging(false)
            setStartX(0)
          }
      }
    }, [testX])
    
     const [width, setWidth] = useState(column.width)
     const [startX, setStartX] = useState(0)
    
    const classes = useStyles()

    // העכבר נכנס ללא לחיצה
    const handleMouseDown = (e) => {
      e.preventDefault()

        setIsDragging(true)
        setIsResize(true)
        setStartX(e.clientX)
      };
    
      // 
      const handleMouseMove = (e) => {
        e.preventDefault()
        if (isDragging && isResize) {
              let newWidth = width - (e.clientX - startX)
              if (newWidth > 70) {
                setStartX(e.clientX)
                setWidth(newWidth)
              }
        }
      };
    
      const handleMouseUp = () => {
        setIsResize(false)
        setIsDragging(false)
        setStartX(0)
      }


// ---------------------------------------------------------------------------------- Start Menu
const [menuHandle, setMenuHandle] = useState(null)
const [anchorEl, setAnchorEl] = React.useState(null)


    // Open the menu on click
    const handleMenuOpen = (event, val) => {
      // console.log(event.currentTarget, val);
        
        setAnchorEl(event.currentTarget)
        setMenuHandle(val.id)
        };
    
    // Close the menu on selecting an option
    const handleMenuClose = () => {
    setMenuHandle()
    setAnchorEl(null)
    };

const handleMenu = (event, valueId) => {
    event.preventDefault()
    menuOptions && handleMenuOpen(event, valueId); // פתיחת התפריט במיקום הנוכחי של העכבר
}


// ---------------------------------------------------------------------------------- End Menu

return <TableCell 
          className={`${classes.header} left ${classes.grab}`}
          style={{ 
            minWidth: width , maxWidth: width , 
            position: 'relative'}}>
            <div style={{ alignItems: 'center', width: '100%', display: 'flex', textAlign: 'right', justifyContent: 'space-between' }}>
              <span style={{ minWidth: '50%', 
                margin: 0,
                textAlign: 'right',
                fontSize: 24,
                whiteSpace: 'nowrap', // למנוע שבירת שורות
                overflow: 'hidden', // להסתיר חלק מהטקסט שחורג מהרוחב
                textOverflow: 'ellipsis', // הצגת נקודות אלכסוניות
            }} onMouseDown={(e) => e.preventDefault()}>{column.headerName}</span>
              <span
                className={classes.customCursor}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                // onMouseLeave={handleMouseLeave} 
                style={{
                  maxWidth: '50%',
                  position: 'absolute',
                  minWidth: 20,
                  minHeight: '100%',
                  left: 0,
                  zIndex: 1,
                  border: 'red solid 2px'
                }}
              ></span>
              {/* <span style={{ maxWidth: '50%', textAlign: 'left' , paddingLeft: 30}}> */}
                  <IconButton aria-controls="three-dots-menu" aria-haspopup="true"
                    onClick={(event) => handleMenu(event, column)}
                  >
                    {/* <Typography variant="body1"  className={`material-icons`}> */}
                        <ArrowDropDownCircleIcon style={{fontSize: 36}} />
                    {/* </Typography> */}
                  </IconButton>
              {/* </span> */}
             </div>
             <OpenMenuTable 
                value={column} 
                menuPosition={{ left: 0, top: 0 }} 
                menuHandle={menuHandle} 
                anchorEl={anchorEl} 
                handleMenuClose={handleMenuClose}
             /> 
            </TableCell>
}
  
  export default ColumnTable;
