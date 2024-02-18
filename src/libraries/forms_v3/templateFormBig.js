import React, { useState, useContext, useEffect } from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import RemoveIcon from '@mui/icons-material/Remove'
import { Grid, IconButton, Tooltip, Dialog, DialogContent } from '@mui/material'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import FieldTemplateForm from './FieldTemplateForm'
import { GlobalContextForm } from './templateFormFloating'

// אנימציה להצגת טופס
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
})

// כותרת וכפתור סגירת הטופס
function BootstrapDialogTitle(props) {
  const { children, onClose, onZoom, fullScreen, onMinimize } = props

  return (<Toolbar>

    <Box xs={4}>
    <Tooltip title="סגור" placement="bottom">
      <IconButton
        // edge="start"
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

const TemplateFormBig = () => {
  const { 
    form, 
    criteria,
    handleClose,
    handleSubmit,
    handleMinimize
  } = useContext(GlobalContextForm)

  const [fullScreen, setFullScreen] = useState(false)

  // // ---------------------------------- פונקציות עבור הטופס ------------------------------------------

  // מגדיל או מקטין את הטופס על מסך מלא
  const handleZoom = () => {
    setFullScreen(!fullScreen)
  } 

  return (
      <Dialog 
          fullScreen={fullScreen}
          maxWidth='xl'
          open={!form.open}
          onClose={(event) => handleClose(event,form)} 
          dir="rtl"
          aria-describedby="alert-dialog-slide-description"
          TransitionComponent={Transition}
          keepMounted>
        <form onSubmit={(event) => handleSubmit(event,form)} >
               <Grid container>
                 {/* header */}
                 {criteria.header && Object.entries(criteria.header).map(([key, value], index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        <FieldTemplateForm 
                            value={value}
                            BootstrapDialogTitle={BootstrapDialogTitle}
                            handleClose={(event) => handleClose(event,form)}
                            handleZoom={handleZoom}
                            fullScreen={fullScreen}
                            handleMinimize={() => handleMinimize(form)}
                        />
                      </Grid>
                    )
                })}
                {/* content */}
                <DialogContent dividers={criteria['dialog'] && criteria['dialog'][0].dividers}>
                <Grid container sx={{ padding: 0}}>
                {criteria.content && Object.entries(criteria.content).map(([key, value], index) => {
                    return (
                      <Grid container spacing={1} key={index}> 
                        <FieldTemplateForm value={value} BootstrapDialogTitle={BootstrapDialogTitle}/>
                      </Grid>
                    )
                })}
                </Grid>
                </DialogContent>
                {/* footer */}
                {criteria.footer && Object.entries(criteria.footer).map(([key, value], index) => {
                    return (
                      <Grid item md={12} key={index}>
                        <DialogActions >
                          <FieldTemplateForm value={value} BootstrapDialogTitle={BootstrapDialogTitle}/>
                        </DialogActions>
                      </Grid>
                    )
                })}
              </Grid>
        </form>
      </Dialog>
  )
}


export default TemplateFormBig






