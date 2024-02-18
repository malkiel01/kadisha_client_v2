import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import { GlobalContextForm } from './templateFormFloating';

// כותרת וכפתור סגירת הטופס
function BootstrapDialogTitle(props) {
  const { children, onClose, onZoom, fullScreen, onMinimize, minimize, ...other } = props

  return (<Toolbar>
    <Box xs={4}>
    <Tooltip title="סגור" placement="bottom">
      <IconButton
        edge="start"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
    {fullScreen ? <Tooltip title="הקטן" placement="bottom">
      <IconButton onClick={onZoom}>
        <ZoomInMapIcon />
      </IconButton>
    </Tooltip> :
    <Tooltip title="הגדל" placement="bottom">
      <IconButton  onClick={onZoom}>
        <ZoomOutMapIcon />
      </IconButton>
    </Tooltip>}
    <Tooltip title="מזער" placement="bottom">
      <IconButton  onClick={onMinimize}>
        <RemoveIcon />
      </IconButton>
    </Tooltip>
    </Box>

    <Box xs={8} sx={{flex: 1}}>
    <Typography 
    textAlign={'center'}
    sx={{ mr: 0, flex: 1 }}
     variant="h6" component="div">
    {children}
    </Typography>
    </Box>

    <Box xs={1}>
    <Typography 
    sx={{ mr: 2 }} 
     component="div">
   שם משתמש
    </Typography>
    </Box>
  </Toolbar>)
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const TemplateFormMini = () => {
  const { 
      form,
      handleClose,
      handleMinimize,
      criteria
   } = useContext(GlobalContextForm)

//   ------------------------------------------------------------------ הוזזת הטופס או החלון
     
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState(0)
  const [left, setLeft] = useState(10)
  const [top, setTop] = useState(10)     

  const handleMouseDown = (event) => {
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()
      setIsDragging(true);
      setStart(event)
    };
  
  const handleMouseMove = (event) => {
    setStart(event)
    if (isDragging) {
      setLeft(left + (start.clientX - event.clientX))
      setTop(top + (start.clientY - event.clientY))
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  }

  const handleMouseLeave = () => {
    setIsDragging(false);
  }



  return (
    <div style={{
        position: 'fixed',
        bottom: top,
        right: left,
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center', // מרכז את האלמנטים בציר האנכי
        justifyContent: 'center', // מרכז את האלמנטים בציר האופקי
      }}>
        <div>
        <Button
          onDoubleClick={() => handleMinimize(form)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          color="primary"
          style={{textAlign: 'right', minWidth: 250, paddingRight: 50, minHeight: 75}}>
          {Object.values(criteria.header).find((v) => v.name !== undefined).name || 'חלון ממוזער'}
        </Button>
        </div>
        <div style={{position: 'absolute', textAlign: 'center', minWidth: 50, minHeight: 50, right: 0}}>
          <IconButton onClick={(event) => handleClose(event,form)}><ClearIcon /></IconButton>
        </div>
    </div>
  )
}

export default TemplateFormMini





