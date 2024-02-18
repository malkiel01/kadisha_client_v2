import React from 'react';

const customDivStyle = {
  border: '1px solid #ddd', // מסגרת אפורה
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', // צל קל
  borderRadius: '10px', // פינות מעוגלות
  padding: '20px',
  margin: '20px',
  position: 'relative',
  backgroundColor: 'white', // רקע לבן
};

const customDivHeaderStyle = {
  position: 'absolute',
  top: '-25px', // ממקם את הכותרת מעט מחוץ לדיב
  rigth: '20px',
  background: 'white', // רקע לכותרת שיתאים לרקע של הדיב
  padding: '5px',
  borderRadius: '5px', // פינות מעוגלות לכותרת
};

const CustomDiv = ({ title, children }) => {
  return (
    <div style={customDivStyle}>
      <div style={customDivHeaderStyle}>{title}</div>
      {children}
    </div>
  );
};

export default CustomDiv;
