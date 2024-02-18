import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { FormHelperText, InputLabel, TextField, Typography } from '@material-ui/core'
import { Button } from '@mui/material'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({name = '', title = '', value = [], setValue = () => {}, data = []}) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false); // תכונה לניהול השגיאה
  const [isFocused, setIsFocused] = useState(false)
  const [personName, setPersonName] = useState(value)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
    setValue(
      typeof value === 'string' ? value.split(',') : value,
    ); // עדכון הערך החיצוני

    if (value.length === 0) {
      console.log('true');
      setError(true);
    } else {
      console.log('false');
      setError(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = (event) => {
    setIsFocused(false)
    // הפעלת handleChange בעת יציאה מהשדה
    handleChange(event)
  };



  const handleDelete = (nameToDelete) => () => {
    setPersonName((prev) => prev.filter((name) => name !== nameToDelete));
  };

  const toggleSelect = () => {
    setOpen(!open);
  }

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
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <FormControl
        error={error} // הגדרת השגיאה על ה-FormControl
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
        <InputLabel style={{
            marginBottom: 7
        }} id="demo-multiple-chip-label">
            <Typography style={{fontSize: theme.typographyTitle.fontSize}}>{title}</Typography>
        </InputLabel>
        <Select
          onBlur={handleBlur}
          onFocus={handleFocus} // טיפול באירוע onFocus
          onChange={handleChange}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name={name}
          value={personName}
          IconComponent={() => (
            <ArrowDropDownIcon
                  sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                />
          )}
          // inputProps={{
          //   onKeyDown: handleKeyDown, // הוספת הטיפול באירועי מקלדת ל-input
          // }}
          input={<OutlinedInput
                id="select-multiple-chip"
                onClick={toggleSelect}
            //   endAdornment={
            //     <ArrowDropDownIcon
            //       sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
            //     />
            //   }
            />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {Array.isArray(selected) ? selected.map((value) => (
                <Chip
                style={{
                    color: theme?.typographyTitle?.color,
                    backgroundColor: theme?.typographyTitle?.backgroundColor,
                    minHeight: 20,
                    paddingLeft:10,
                    borderRadius: '5px'
                }}
                disabled={false}
                size="medium"
                variant="elevated"
                key={value}
                label={value}
                onDelete={handleDelete(value)}
          />
        )) : ''}
      </Box>
            // <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
            //   {selected.map((value) => (
            //     <Chip
            //         style={{
            //             color: theme?.typographyTitle?.color,
            //             backgroundColor: theme?.typographyTitle?.backgroundColor,
            //             minHeight: 20,
            //             paddingLeft:10,
            //             borderRadius: '5px'
            //         }}
            //         disabled={false}
            //         size="medium"
            //         variant="elevated"
            //         key={value}
            //         label={value}
            //         onDelete={handleDelete(value)}
            //   />
            //   ))}
            // </Box>
          )}
          MenuProps={MenuProps}
          open={open}
        >
          {data.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        {(error && !isFocused) && <FormHelperText>
          <span style={{fontSize: theme.paragraph.fontSize, color: 'red'}}>
          שדה חובה
          </span>
          </FormHelperText>} 
      </FormControl>
    </Box>
  );
}
