import React, { useState, useContext, useEffect, useRef } from 'react'


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

  // const [isDragging, setIsDragging] = useState(false)
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


  const [isDragging, setIsDragging] = useState(false);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const tableCellRef = useRef(null);
  const dragSpanRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target === dragSpanRef.current) {
      setIsDragging(true);
      setInitialWidth(tableCellRef.current.getBoundingClientRect().width);
      setInitialMouseX(e.clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialMouseX;
      const newWidth = initialWidth - deltaX;
      console.log('New Width:', newWidth);
      setWidth(newWidth)
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setInitialWidth(0)
    setInitialMouseX(0)
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleMouseUpGlobal = () => {
      handleMouseUp();
    };

    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, initialMouseX, initialWidth]);



  return <TableCell style={{ ...theme.titleTable, minWidth: width, maxWidth: width, position: 'relative' }}
  ref={tableCellRef} onMouseDown={handleMouseDown}
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
      ref={dragSpanRef}
        // onMouseDown={handleMouseDownOnSpan}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseLeave}
        // onMouseEnter={handleMouseEnter}
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
