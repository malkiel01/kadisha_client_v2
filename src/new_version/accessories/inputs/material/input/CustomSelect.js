import React, { useState, useImperativeHandle, forwardRef } from 'react';
// import { FormControl, FormHelperText, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem, Typography, OutlinedInput } from '@mui/material'
import { useTheme } from '@mui/material/styles';

function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

const CustomSelect = forwardRef(({
        name = '', title = '', value = '', setValue = () => { }, data = [],
        handleFieldError = () => { },
        update = false, errors = null, repeat = [] }, ref) => {

        const transformedData = data.map(item => {
                return {
                        key: item.key,  // מפתח
                        value: item.value  // ערך להצגה
                };
        });

        const theme = useTheme();
        const [error, setError] = useState(false);
        const [message, setMessage] = useState('')
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

        useImperativeHandle(ref, () => ({
                validate: () => {
                        validations(data);
                        return !error;
                }
        }));

        const validations = (value) => {
                let hasError = false;
                let message = '';

                if (errors?.notNull && (value === '' || value === null)) {
                        hasError = true;
                        message = errors.notNull;
                }

                if (!hasError && errors?.notRepeat && repeat.includes(value)) {
                        hasError = true;
                        message = errors.notRepeat;
                }

                setError(hasError);
                handleFieldError(name, hasError);
                setMessage(message);
        };

        // const handleChange = (event) => {
        //         const { value } = event.target;
        //         setData(value);
        //         validations(value);
        // };

        return (
                <FormControl
                        sx={{
                                m: 1, minWidth: '100%',
                                '& .MuiOutlinedInput-root': {
                                        height: '45px', // הגדרת הגובה הכולל של ה-TextField
                                        marginTop: '20px',
                                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'red', // שינוי צבע המסגרת לאדום במקרה של שגיאה
                                                borderWidth: '2px', // שינוי עובי המסגרת ל-4 פיקסלים
                                        },
                                        '& .MuiOutlinedInput-input': {
                                                height: '45px', // הגדרת הגובה לאלמנט הקלט
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
                        error={error}
                >
                        <InputLabel style={{ marginTop: 0, right: 5 }} id="demo-multiple-chip-label">
                                <Typography variant='h2' style={{ fontSize: '1rem', padding: '0 15px' }}>{title}</Typography>
                        </InputLabel>
                        <Select
                                id={name}
                                value={data || ''}
                                onChange={handleChange}
                                variant="outlined"
                                disabled={update}
                                // style={{ height: '45px', marginTop: '20px' }}
                                MenuProps={{
                                        style: { fontSize: '1.1rem', color: update ? '#000' : 'default' },
                                        anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                        },
                                        transformOrigin: {
                                                vertical: "top",
                                                horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                }}
                                input={<OutlinedInput
                                        id="select-multiple-chip"
                                        onClick={toggleSelect}
                                />}
                                // MenuProps={MenuProps}
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

                                {/* {options.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                ))} */}
                        </Select>
                        {(error && message) && (
                                <FormHelperText>
                                        <span style={{ fontSize: theme.typography.pxToRem(12), color: 'red' }}>
                                                {message}
                                        </span>
                                </FormHelperText>
                        )}
                </FormControl>
        );
});

export default CustomSelect;
