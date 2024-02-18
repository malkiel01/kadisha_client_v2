import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const MenuPopup = ({data = [], 
    anchorElUser = null, setAnchorElUser = () => {}
}) => {

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      }

    return (
        <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        >
        {data.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              {setting}
            </MenuItem>
        ))}
        </Menu>
    );
}

export default MenuPopup;
