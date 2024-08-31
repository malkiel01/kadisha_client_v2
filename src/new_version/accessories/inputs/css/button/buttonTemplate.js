import React from 'react';
import './ButtonTemplate.css'; // ייבוא קובץ ה-CSS

const ButtonTemplate = ({ text, onClick = () => {}, type = 'button' }) => {
    // פונקציה שתקרא כאשר מלחצים על הכפתור
    const handleClick = (e) => {
            onClick(e);
    };

    return (
        <button className="button-template" type={type} onClick={handleClick}>
            {text}
        </button>
    );
}

export default ButtonTemplate;
