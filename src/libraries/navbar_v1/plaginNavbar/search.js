import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchApp({ width= 'auto', value }) {
  const [inputValue, setInputValue] = useState('')


  // הגדרת פונקציה לטיפול באירועי מקשים בתיבת האינפוט
  const handleKeyPress = (event) => {
    const updatedValue = event.target.value
    setInputValue(updatedValue)
    value(updatedValue)
  };


  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '4px', // אפשר לשנות את הערך לכל מה שאתה רוצה
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // צבע הרקע בעטיפה
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.25)', // צבע הרקע בעטיפה בעת hover
        },
        marginRight: 8, // מרווח מימין
        marginLeft: 8, // מרווח משמאל
        width: width, // רוחב כולל 100%
        '@media (minWidth: 600px)': {
          marginLeft: '24px', // במסך גדול יותר שנרגיש בעטיפה מרווח משמאל
          // width: 'auto', // במסך גדול יותר הרוחב יהיה אוטומטי
        },
      }}
      dir="ltr"
    >
      <div
        style={{
          padding: '0px 16px', // התמצעות מרווח מהצדדים של הסטייל
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchIcon />
      </div>
      <InputBase
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyPress}
        style={{
          color: 'inherit',
          padding: '8px 8px 8px 48px', // התמצעות מרווח מהצדדים של הסטייל
          // vertical padding + font size from searchIcon
          transition: 'width 0.3s',
          width: '100%',
          '@media (minWidth: 600px)': {
            width: '20ch',
          },
        }}
        dir="rtl"
        placeholder="חיפוש..."
        inputProps={{ 'aria-label': 'חיפוש' }}
      />
    </div>
  );
  }
