import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Logout from './logout';
import MenuPopup from '../../../layouts/accessories/menuPopup';

const settings = [
  'Profile', 
  'Account', 
  'Dashboard', 
  <Logout/>
];

const User = () => {

  const [anchorElUser, setAnchorElUser] = useState(null)

const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
}
    
    return (
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
        </Tooltip>
        <MenuPopup data={settings} anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser} />
    </Box>
    );
  }
  
  export default User;
  