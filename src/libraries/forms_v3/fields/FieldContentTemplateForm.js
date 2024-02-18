import React, { useContext } from 'react'

import Button from '@mui/material/Button';
import DialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import RemoveIcon from '@mui/icons-material/Remove'
import { Grid, IconButton, Tooltip, Dialog, DialogContent, DialogTitle, Fab } from '@mui/material'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'

import PropTypes from 'prop-types'

import InputText from './InputText'
import InputSelect from './InputSelect'
import ImageGallery from './img'





const FieldContentTemplateForm = (props) => {
    const { 
        value,
        form,
        handleInputChange,
        BootstrapDialogTitle,
        handleClose,
        handleZoom,
        fullScreen,
        handleMinimize,
        TempGeneral
      } = props

  //       // מעדכן את השינויים בשדות הטופס
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target
  //   console.log('handleInputChange: ',{ name, value })
  //   // console.log('formValues: ',formValues)
  //   // setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  // }
    



// מרנדר ומייצר את מלאי השדות של הטופס
  const renderComponent = (value) => {
    if (value) {
    // בודק אם הערך הבא הוא גריד או שדה, וגם שדה אם הוא ניתן לצפייה
    if ((value.properties && !value.properties.hidden)) {
      // ממיין לפי סוגי השדות
      switch (value.properties.type) {
        case 1:
          return <InputSelect data={value} onChange={handleInputChange}/>
        case 2:
          return <InputText data={value} onChange={handleInputChange}/>
        case 3:
          return <ImageGallery></ImageGallery>
        case 'submit':
          return (
            <Button 
            type={value.properties.type} 
            variant={value.properties.variant} 
            color={value.properties.color}
            >
              {value.name}
            </Button>
          )
        case 'close':
          return (    
              <BootstrapDialogTitle 
              dir={props.dir ? props.dir : 'ltr'} 
              id="customized-dialog-title" 
              onClose={handleClose} 
              onZoom={handleZoom}
              fullScreen={fullScreen}
              onMinimize={handleMinimize}
              minimize={form.open}
              // minimize={minimized}
              style={{padding: 0}}>
                {value.name}
              </BootstrapDialogTitle>
          )
        default:
          return <TempGeneral />;
      }
    } 
    // כשהערך הוא גריד ולא שדה
    else if(value.container) {

        // בודק אם יישנו גריד פנימי נוסף
        if (Object.values(value.container).find(v => v.container)) {
          return (
              Object.values(value.container)
                    .map((v, index) => <Grid item
                      container={v.container}
                      xs={v.grid !== undefined ? v.grid.xs : 12} 
                      md={v.grid !== undefined ? v.grid.md : 12} 
                      key={index}>
                        {renderComponent(v)}
                </Grid>)
          )
        } else {
          return (
              Object.values(value.container)
                    .map((v, index) => <Grid item
                      // container={v.container}
                      // style={ {border: '1px blue solid'}}
                      xs={v.grid !== undefined ? v.grid.xs : 12} 
                      md={v.grid !== undefined ? v.grid.md : 12} 
                      key={index}>
                        {renderComponent(v)}
              </Grid>)
          )
        }
    }
    }
   
  }

return renderComponent(value)
}

export default FieldContentTemplateForm

