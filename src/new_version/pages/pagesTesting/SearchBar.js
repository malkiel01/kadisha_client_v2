import React from 'react';
import { TextField, Select, MenuItem, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder="חיפוש"
        sx={{
          borderRadius: '50px 0 0 50px', // עיגול פינות חיצוניות בלבד
          flex: 2,
          backgroundColor: 'rgba(255, 255, 240, 0.9)',
          height: '50px', // גובה של האינפוט כדי ליצור יחס נכון בין הרוחב לגובה
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px 0 0 50px', // עיגול פינות חיצוניות בלבד
            height: '50px', // גובה של האינפוט כדי ליצור יחס נכון בין הרוחב לגובה
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Select
        variant="outlined"
        defaultValue=""
        sx={{
          borderRadius: '0 50px 50px 0', // עיגול פינות חיצוניות בלבד
          flex: 1,
          backgroundColor: 'rgba(255, 255, 240, 0.9)',
          height: '50px', // גובה של הסלקט כדי ליצור יחס נכון בין הרוחב לגובה
          '& .MuiOutlinedInput-root': {
            borderRadius: '0 50px 50px 0', // עיגול פינות חיצוניות בלבד
            height: '50px', // גובה של הסלקט כדי ליצור יחס נכון בין הרוחב לגובה
          },
        }}
      >
        <MenuItem value="">כל הסינונים</MenuItem>
        <MenuItem value="filter1">סינון 1</MenuItem>
        <MenuItem value="filter2">סינון 2</MenuItem>
      </Select>
    </Box>
  );
}

export default SearchBar;
