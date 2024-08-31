import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { OutlinedInput, MenuItem, FormControl, Select, InputLabel, Typography } from '@mui/material'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import { InputLabel, Typography } from '@material-ui/core'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      fontSize: '1.1rem',
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectPersonal({
  name = '', title = '', value = '', setValue = () => { }, data = [],
  handleFieldError = () => { },
  update = false, errors = null, repeat = [] }, ref) {

  const theme = useTheme()
  const [error, setError] = useState(false); // תכונה לניהול השגיאה
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // useImperativeHandle(ref, () => ({
  //   validate: () => {
  //     valdations(data);
  //     return !error;
  //   }
  // }))

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

  const transformedData = data.map(item => {
    return {
      key: item.key,  // מפתח
      value: item.value  // ערך להצגה
    };
  });
  const findValueByKey = (data, value) => {

    console.log('data', data, 'value', value);
    const item = data.find(item => item.key === value)
    console.log('data', data, 'value', value, 'item', item)

    return item ? item.key : '';
  };

  const [personName, setPersonName] = useState(() => findValueByKey(data, value))
  const [open, setOpen] = useState(false)

  const handleChange = (event) => {
    const selectedKey = event.target.value
    const myData = data.find(item => item.key === selectedKey)
    const person = myData ? myData.key : ''
    const value = myData ? myData.key : ''

    console.log(1, myData, 2, person, 3, value);

    setPersonName(person)
    setValue(value)


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
    <FormControl sx={{
      textAlign: 'right',
      // margin: 120,
      m: 1, minWidth: '100%', // רוחב ה-FormControl הוגדר ל-100%
      '.MuiOutlinedInput-root': {
        height: '45px', // הגדרת הגובה הכולל של ה-TextField
        marginTop: 2,
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

      style={{ minWidth: '100%' }}
      error={error} // הגדרת השגיאה על ה-FormControl
    >

      <InputLabel shrink={true} style={{
        textAlign: 'right', // הצמדה לצד ימין
        width: '100%', // מאפשר לכותרת למלא את הרוחב
        right: '-24%', fontSize: '12px'
      }}>
        <Typography style={{ fontSize: '22px', padding: '0 15px' }}>{title}</Typography>
      </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        name={name}
        value={personName}
        onChange={handleChange}
        IconComponent={() => (
          <ArrowDropDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
        )}
        input={<OutlinedInput

          sx={{ paddingRight: 1, fontSize: '20px' }}
          id="select-multiple-chip"
          onClick={toggleSelect}
        />}
        MenuProps={MenuProps}
        open={open}
      >
        {transformedData.map((item) => (
          <MenuItem
            key={item.key}
            value={item.key}
            style={getStyles(item.key, personName, theme)}
          >
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
