import React from 'react';
import './selectTemplate.css'; // ייבוא קובץ ה-CSS
import { Grid } from '@mui/material';

const SelectTemplate = ({
    name='',
    type = 'text',
    defaultValue = '',
    options = {},
    placeholder,
    onKeyPress = () => { },
    onChange = () => { },
    error = '',
    style = {},
    disabled = false,

}) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (onKeyPress) {
            onKeyPress(e.key);
        }
    };

    return (
        <Grid item xs={style?.xs} sm={style?.sm} md={style?.md} lg={style?.lg} xl={style?.xl}>
            <div className="select-container">
                <select
                    name={name}
                    disabled={disabled}
                    onChange={onChange}
                >
                    <option value={defaultValue}>{placeholder}</option> {/* פלייסהולדר לבחירה ראשונית */}
                    {options.map((option, index) => (
                        <option key={index} value={option?.value}>
                            {option?.label || option?.value}
                        </option>
                    ))}
                </select>
                {error && <div className="error-message">{error}</div>}
            </div>
            {/* <div className="input-container">
                <input
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
                {error && <div className="error-message">{error}</div>}
            </div> */}
        </Grid>
    );
}

export default SelectTemplate;
