import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'


const Mail = () => {


    
    return (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit"   
            sx={{ ml: 1 }} // שנה את הכיוון לימין
            >
            <Badge badgeContent={40} color="error">
            <MailIcon />
            </Badge>
        </IconButton>
    );
  }
  
  export default Mail;
  