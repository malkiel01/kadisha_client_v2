import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../App'; // וודא שהנתיב נכון לפי המבנה שלך

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();
  const { setToken } = React.useContext(GlobalContext); // קבלת הטוקן מהקונטקסט

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccountClick = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null)
    navigate('/');
  };

  return (
    <React.Fragment>
      <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleAvatarClick}>
        <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>My Account</DialogTitle>
        <DialogContent>
          {/* כאן תוכל להוסיף את התוכן של החשבון שלי */}
          <p>כאן תוכל לשים את התוכן של הפופאפ.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ProfileMenu;
