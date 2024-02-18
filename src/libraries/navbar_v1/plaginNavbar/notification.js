import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'


const Notification = () => {
    
    return (
        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ ml: 1 }}>
            <Badge badgeContent={15} color="error">
            <NotificationsIcon />
            </Badge>
        </IconButton>
    );
  }
  
  export default Notification;
  