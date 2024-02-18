import React, { useState, useEffect, useContext } from 'react'
import { TextField, Snackbar } from '@mui/material'
import { GlobalContextForm } from '../templateFormFloating';

function InputText({field }) {
  const { 
    form,
    setForm, 
    fields,
    setFields,
    submit
  } = useContext(GlobalContextForm)

  // useEffect(() => {
  //   // console.log('submit2', submit)
  //   // handleSubmit()
  // }, [submit]);

  const newOrUpdate = () => {
    return Array.isArray(form?.dataFields) && form.dataFields.some(itemId => itemId.name === 'id') && field?.notUpdateData
  }

  const getValueField = () => {
    let tempFields = form.dataFields.find(f => f.name === field?.name)
    return tempFields?.value
  }
  
  const [inputValue, setInputValue] = useState(getValueField)

  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    !newOrUpdate() && checkValidation(inputValue,field?.properties)
    updateFields()
  }, [submit, error])

  const updateFields = () => {
    // בדיקה אם השדות הם מערך
    if (Array.isArray(fields)) {
      // בדיקה אם המערך מכיל את השדה שלנו
      let tempFields = fields.find(item => item.name === field.name)
      if (!tempFields) {
        setFields(fields => [...fields, {name: field.name, value: inputValue, error: error , properties: field.properties}])
      } else {
        // אם השדה כבר קיים, עדכן רק את הערך של value
        setFields(fields => fields.map(item => (item.name === field.name ? { ...item, value: inputValue, error: error  } : item)))
      }
    }
  }
  
  const handleCloseAlert = () => {
    // סגירת האלרט
    setAlertOpen(false)
  }

  const validation = (event) => {
      setError(event?.status || false)
      setAlertOpen(event?.status || false)
      setMessage(event?.message || '')
  }

  const checkValidation = (value, properties) => {
    if (properties?.validationRequired) {
      if (value === '') {
        validation({ status: true, message: 'השדה הוא שדה חובה' })
        return false
      } else {
        validation({ status: false, message: '' })
      }
    }
    if (properties?.validationNotExists) { 
      let data = properties?.validationNotExists || []
      let temp = data.filter(item => (item?.value === value) && (form?.dataFields[0]?.value !== item?.id))[0] || null
      if (temp) {
        validation({ status: true, message: `הערך ${temp.value} כבר קיים באיידי ${temp.id} והאיידי שלנו הוא ${form?.dataFields[0]?.value}` })
        return false
      }
    }
    return true
  }

  const handleChange = (e) => {
    let fieldValue = e?.value || ''
    let fieldName = field?.name || ''
    let fieldProperties = field?.properties || []

    checkValidation(fieldValue,fieldProperties)

    const isFieldExists = form?.dataFields?.some(field => field.name === fieldName)
    let temp = {...form, dataFields: isFieldExists ? 
      (form.dataFields.map(fieldTemp => (fieldTemp.name === fieldName) ? { ...fieldTemp, value: fieldValue, error: error } : fieldTemp )) : 
      [...form.dataFields, {name: fieldName, value: fieldValue, properties: fieldProperties}]}
    console.log(temp)
    updateFields()
    setForm(temp)
    setInputValue(fieldValue)
  }

  // const handleSubmit = () => {
  //   checkValidation(inputValue,(field?.properties || []))
  // }

  return (
    <>
        <TextField
          inputProps={{ dir: 'rtl' }}
          key={field?.name}
          name={field?.name}
          label={field?.label}
          placeholder={field.label}
          value={inputValue || ''}
          onChange={(e) => handleChange(e.target)}
          onBlur={(e) => handleChange(e.target)} // קריאה לפונקציה onBlur
          fullWidth={field.properties.fullWidth}
          required={field?.properties?.validationRequired}
          margin="normal"
          hidden={field?.properties?.hidden}
          disabled={newOrUpdate()}
          helperText={message} // הוסף כאן את הודעת השגיאה
          error={error} // קבע את מצב השגיאה
        />
        <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={message}
      />
      </>
  )
}

export default InputText
