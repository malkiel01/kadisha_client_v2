import React, { useState } from 'react';
import { Box, Grid, MenuList, MenuItem, Paper } from '@mui/material';

const MyGenericComponent = ({ menuItems }) => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].key);

  const handleMenuClick = (menuKey, isDisabled) => {
    if (!isDisabled) {
      setSelectedMenu(menuKey);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={3} sx={{ borderRight: '1px solid #ddd', overflowY: 'auto' }}>
          <MenuList>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.key} 
                onClick={() => handleMenuClick(item.key, item.disabled)}
                disabled={item.disabled} // הגדרת disabled לרכיב
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
        <Grid item xs={9} sx={{ height: '100%', overflowY: 'auto', padding: 2 }}>
          <Paper elevation={0} sx={{ padding: 2, height: '100%', overflowY: 'auto' }}>
            {menuItems.map((item) =>
              item.key === selectedMenu && !item.disabled ? (
                <div key={item.key}>{item.content}</div>
              ) : null
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyGenericComponent;
