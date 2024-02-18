import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import FormControl from '@mui/material/FormControl'
import { FormHelperText, InputLabel, TextField, Typography } from '@material-ui/core'
import { useTheme } from '@mui/material/styles'

  const CustomInput = forwardRef(({
    name = '', title = '', data = null, setData = () => {}, 
    handleFieldError = () => {}, 
    update = false, errors = null, repeat = []}, ref) => {

  const theme = useTheme()
  const [error, setError] = useState(false); // תכונה לניהול השגיאה
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useImperativeHandle(ref, () => ({
    validate: () => {
      valdations(data);
      return !error;
    }
  }))

  const valdations = (value) => {
    let hasError = false
    let message = ''

    // בדיקת notNull
    if (errors?.notNull && (value === '' || value === null)) {
      hasError = true
      message = errors.notNull
    }

    // בדיקת notRepeat
    if (!hasError && errors?.notRepeat && repeat.includes(value)) {
      hasError = true
      message = errors.notRepeat
    }

    setError(hasError)
    handleFieldError(name, hasError)
    setMessage(message)
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setData(value)
    valdations(value)
  }

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = (event) => {
    setIsFocused(false)
    handleChange(event)
  }

  return (
    <FormControl sx={{
      m: 1,
      minWidth: '100%', 
      '& .MuiOutlinedInput-root': {
        height: '55px', // הגדרת הגובה הכולל של ה-TextField
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: 'red', // שינוי צבע המסגרת לאדום במקרה של שגיאה
          borderWidth: '2px', // שינוי עובי המסגרת ל-4 פיקסלים
        },
        '& .MuiOutlinedInput-input': {
          height: '55px', // הגדרת הגובה לאלמנט הקלט
          padding: '0 14px', // כדי למרכז את הטקסט ולשמור על פדינג יפה
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'yellow', // צבע בורדר ב-hover
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'green', // צבע בורדר ב-focus
        },
      },
    }}

    style={{minWidth: '100%'}}
    error={error} // הגדרת השגיאה על ה-FormControl
    >
    <InputLabel style={{
        marginBottom: 7
        }} id="demo-multiple-chip-label">
        <Typography variant='h2' style={{fontSize: '1.5rem'}}>{title}</Typography>
    </InputLabel>
    <TextField
      InputProps={{
        style: { fontSize: '1.5rem', color: update ? '#000' : 'default' }
      }}
    name={name}
    required={errors}
    disabled={update}
    variant="outlined"
    value={data || ''} // הצגת הערך
    error={error} // קבע את מצב השגיאה
    onBlur={handleBlur}
    onFocus={handleFocus} // טיפול באירוע onFocus
    onChange={handleChange}
  />
        {(error && !isFocused) && <FormHelperText>
        <span style={{fontSize: theme.paragraph.fontSize, color: 'red'}}>
        {message}
        </span>
      </FormHelperText>} {/* הודעת שגיאה */}
  </FormControl>
  )
})

export default CustomInput
