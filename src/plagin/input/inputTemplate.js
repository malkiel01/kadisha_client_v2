import React from 'react';
import './InputTemplate.css'; // ייבוא קובץ ה-CSS
import { Grid } from '@mui/material';

const InputTemplate = ({
    name='',
    type = 'text',
    defaultValue,
    placeholder,
    onKeyPress = () => { },
    onChange = () => { },
    error = '',
    style = {},
    disabled= false,

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
            <div className="input-container">
                <input
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
                {error && <div className="error-message">{error}</div>}
            </div>
        </Grid>
    );
}

export default InputTemplate;
