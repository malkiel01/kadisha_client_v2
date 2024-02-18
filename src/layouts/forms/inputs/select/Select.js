import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { InputLabel, Typography } from '@material-ui/core'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
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

export default function SelectPersonal({name = '', title = '', value = '', setValue = () => {}, data = []}) {
  const theme = useTheme();
  // המרה של נתונים לפורמט מתאים
  const transformedData = data.map(item => {
    return {
      key: item.key,  // מפתח
      value: item.value  // ערך להצגה
    };
  });
  const findValueByKey = (data, value) => {

    console.log('data',data, 'value',value);
    const item = data.find(item => item.key === value)
    console.log('data',data, 'value',value,'item',item)

    return item ? item.key : '';
  };

  const [personName, setPersonName] = React.useState(() => findValueByKey(data, value));
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const selectedKey = event.target.value
    const myData = data.find(item => item.key === selectedKey)
    const person = myData ? myData.key : ''
    const value = myData ? myData.key : ''

    console.log(1,myData,2,person,3,value);

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
          m: 1, 
          minWidth: '100%', // רוחב ה-FormControl הוגדר ל-100%
          '.MuiOutlinedInput-root': { 
            paddingRight: '2px', 
            minHeight: '50px',
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
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name={name}
          value={personName}
          onChange={handleChange}
          IconComponent={() => (
            <ArrowDropDownIcon
                  sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                />
          )}
          input={<OutlinedInput
                id="select-multiple-chip"
                onClick={toggleSelect}
            //   endAdornment={
            //     <ArrowDropDownIcon
            //       sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
            //     />
            //   }
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
