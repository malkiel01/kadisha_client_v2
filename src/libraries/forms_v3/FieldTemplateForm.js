import React, { useContext, useEffect } from 'react'

import Button from '@mui/material/Button'
import { Grid } from '@mui/material'

import InputText from './fields/InputText'
import InputSelect from './fields/InputSelect'
import ImageGallery from './fields/img'


import { GlobalContextForm } from './templateFormFloating'

// קומפוננטה המוצגת כשסוג השדה אינו קיים
const TempGeneral = () => {
  return <div>לא קיים סוג השדה המצויין</div>;
}

const FieldTemplateForm = (props) => {
  const { 
      value,
      BootstrapDialogTitle,
      handleClose,
      handleZoom,
      fullScreen,
      handleMinimize
    } = props
  const { 
    form, 
    // handleInputChange,
  } = useContext(GlobalContextForm)

  // מרנדר ומייצר את מלאי השדות של הטופס
  const renderComponent = (itemValue) => {
    if (itemValue) {
      // בודק אם הערך הבא הוא גריד או שדה, וגם שדה אם הוא ניתן לצפייה
      if ((itemValue.properties && !itemValue.properties.hidden)) {
        // ממיין לפי סוגי השדות
        switch (itemValue.properties.type) {
          case 1:
            return <InputSelect data={itemValue} form={form} 
            />
          case 2:
            return <InputText id={0} field={itemValue}
            />
          case 3:
            return <ImageGallery></ImageGallery>
          case 'submit':
            return <Button type={itemValue.properties.type} variant={itemValue.properties.variant} color={itemValue.properties.color}> {itemValue.name} </Button>
          case 'close':
            return (    
                <BootstrapDialogTitle 
                dir={props.dir ? props.dir : 'ltr'} 
                id="customized-dialog-title" 
                onClose={handleClose} 
                onZoom={handleZoom}
                fullScreen={fullScreen}
                onMinimize={handleMinimize}
                style={{padding: 0}}>
                  {itemValue.name}
                </BootstrapDialogTitle>
            )
          default:
            return <TempGeneral/>
        }
      } 
      // כשהערך הוא גריד ולא שדה
      else if(itemValue.container) {

          // בודק אם יישנו גריד פנימי נוסף
          if (Object.values(itemValue.container).find(v => v.container)) {
            return (
                Object.values(itemValue.container)
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
                Object.values(itemValue.container)
                      .map((v, index) => <Grid item
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

export default FieldTemplateForm;

