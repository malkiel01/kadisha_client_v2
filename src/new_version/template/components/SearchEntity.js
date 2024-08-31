import React from 'react';
import { TextField, InputAdornment, Box, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { TemplateContext } from '../../pages/pagesMains/GravesManagers/Graves';

function SearchEntity({
  width = '100%'
}) {
  const { nameBtnAdd, searchText, setSearchText, totalWidthContainer } = useContext(TemplateContext)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder="חיפוש"
        type="search"
        sx={{
          width: '100%', // הגדרת רוחב לשדה החיפוש שיתאים ל-Box ההורה
          maxWidth: width, // הגדרת רוחב מקסימלי במידת הצורך

          "& .MuiOutlinedInput-input": {
            background: 'none',
          },
          borderRadius: '50px', // עיגול פינות חיצוניות בלבד
          // flex: 2,
          backgroundColor: 'rgba(255, 255, 240, 0.9)',
          backgroundColor: '#F9FAFC',

          height: '50px', // גובה של האינפוט כדי ליצור יחס נכון בין הרוחב לגובה
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px', // עיגול פינות חיצוניות בלבד
            height: '50px', // גובה של האינפוט כדי ליצור יחס נכון בין הרוחב לגובה
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 240, 0.9)', // שומר על רקע קבוע בעת ריחוף
              backgroundColor: '#F9FAFC',

            },
            '&.Mui-focused': {
              boxShadow: 'none', // מבטל את הצל שמתוסף בדיפולט בעת פוקוס
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Box>
  );
}

export default SearchEntity;
