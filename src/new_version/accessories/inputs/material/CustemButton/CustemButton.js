import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Button } from '@mui/material'

export default function CustemButton({name = '',
type='input', 
onClick = () => {}}) {
   const [open, setOpen] = useState(false)
 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Toggle the select dropdown on Enter or Space
      setOpen(!open);
    }
    if (event.key === 'Tab' && open) {
      setOpen(!open)
    }
  }


  return (
    <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <FormControl
        sx={{ 
            m: 1, 
            minWidth: '100%', // רוחב ה-FormControl הוגדר ל-100%
            '.MuiOutlinedInput-root': { 
              paddingRight: '2px', 
              minHeight: 40,
              '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: 'red', // שינוי צבע המסגרת לאדום במקרה של שגיאה
                borderWidth: '2px', // שינוי עובי המסגרת ל-4 פיקסלים
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'yellow', // גבול צהוב ב-hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'green', // גבול ירוק ב-focus
              },
              '&.Mui-focused.MuiInputBase-input': {
                borderColor: 'green', // כדי לוודא שהגבול יהיה ירוק גם כאשר ה-Select פתוח
              },
              '& .MuiSelect-select': {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5',
                alignItems: 'center',
                minHeight: '50px',
                padding: '2px',
              }
            },
        }}
        onKeyDown={handleKeyDown}
        >
          {(type === 'submit') ? 
            <Button
            style={{
              backgroundColor: '#99C019',
              padding: '0 10px',
              color: '#10172A'
            }}
            type={type}>{name}</Button>
          : 
          <Button style={{
            backgroundColor: '#99C019',
            height: 45,
            padding: '0 10px',
            marginTop: 20,
            color: '#10172A'
        }}
        onClick={onClick}
        type={type}
        >
        {name}
        </Button>
          }

      </FormControl>
    </Box>
  );
}
