import React, { useState } from 'react'
import { TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function InputSelect(props) {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    props.onChange(event)
  };
    
  return (
    <FormControl fullWidth={props.data.properties.fullWidth}>
    <InputLabel id={props.data.properties.labelId}>{props.data.label}</InputLabel>
    <Select
        key={props.data.name}
        name={props.data.name}
        label={props.data.label}
        placeholder={props.data.label}
        value={formValues[props.data.name] || ''}
        onChange={handleInputChange}
        labelId={props.data.properties.labelId}
        id={props.data.id}
    >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    </FormControl>
  )
}

export default InputSelect
