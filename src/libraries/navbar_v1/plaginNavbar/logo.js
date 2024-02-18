import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';


const Logo = () => {
    
    return (
      <>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
        >
            LOGO
        </Typography>
      </>
    );
  }
  
  export default Logo;
  