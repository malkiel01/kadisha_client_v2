
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const Hamburger = ({ handleDrawerToggle }) => {

    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
        </IconButton>
    );
  }
  
  export default Hamburger;
  