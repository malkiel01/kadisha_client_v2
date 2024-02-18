import React, { useState, useContext, useEffect } from 'react'


import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import { GlobalContextTable } from '../TemplateTable'
import OpenMenuTable from '../plaginTable/OpenMenuTable'

import { useTheme } from '@mui/material/styles';

import { TableCell } from '@mui/material'



const ColumnTable = ({ column }) => {
  const theme = useTheme()

  const { menuOptions, testX,
    isResize, setIsResize,
  } = useContext(GlobalContextTable)

  const [isDragging, setIsDragging] = useState(false)
  const [isMouseOver, setIsMouseOver] = useState(false);


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
      if (newWidth >= 70) {
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
  const handleMouseLeave = () => {
    setIsResize(false)
    setIsDragging(false)
    setIsMouseOver(false)
    setStartX(0)
  }

  // Event handler for mouse entering the outer span
  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };


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

  return <TableCell style={{ ...theme.titleTable, minWidth: width, maxWidth: width, position: 'relative' }}
  >
    <div style={{ alignItems: 'center', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ alignItems: 'center', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <span
          style={{
            whiteSpace: 'nowrap', // למנוע שבירת שורות
            overflow: 'hidden', // להסתיר חלק מהטקסט שחורג מהרוחב
            textOverflow: 'ellipsis', // הצגת נקודות אלכסוניות
          }}
        >{column.headerName}</span>
        <span><ArrowDropDownCircleIcon onClick={(event) => handleMenu(event, column)} style={{ fontSize: 26, margin: 0, padding: 0 }} /></span>
      </span>
      <span
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          maxWidth: '50%',
          position: 'absolute',
          minWidth: 20,
          minHeight: '100%',
          left: 0,
          top: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'col-resize',
        }}
      >
        <span
          style={{
            position: 'relative',
            display: 'flex', // שורה זו מוסיפה Flexbox לספאן הפנימי
            alignItems: 'center', // מירכז את הספאן הפנימי אנכית
            justifyContent: 'center', // מירכז את הספאן הפנימי אופקית
          }}
        >
          {isMouseOver && (
            <span
              style={{
                minHeight: '30px',
                width: '1px', // הוספתי רוחב כדי שהספאן יהיה מרוכז
                borderRadius: '4px',
                border: 'green solid 2px',
                display: 'inline-block',
                boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
              }}
            ></span>
          )}
        </span>
      </span>
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
