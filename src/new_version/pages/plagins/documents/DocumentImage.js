import React, { useState } from 'react';

const DocumentImage = ({ id, src, fileName, handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const imageStyle = {
    height: '80px',
    width: '60px',
    cursor: 'pointer',
    filter: isClicked ? 'brightness(50%)' : 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // צל מכל הכיוונים
    borderRadius: '4px', // פינות עגולות
    transition: 'transform 0.3s ease',
  };

  const imageContainerStyle = {
    margin: '0 10px',
    textAlign: 'center',
    width: '150px', // רוחב קבוע של 100 פיקסלים
  };


  const textStyle = {
    filter: 'blur(0.1px)', // טשטוש עדין
    fontWeight: 'bold', // טקסט מודגש
    marginTop: '8px', // רווח בין התמונה לטקסט
    textAlign: 'center', // יישור טקסט למרכז
  };



  return (
    <div style={imageContainerStyle}>
      <img
        src={src}
        alt="Document"
        style={imageStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onClick={() => handleClick(id, fileName, setIsClicked)}
      />
      <div style={textStyle}>{fileName}</div>
    </div>
  );
};

export default DocumentImage;
