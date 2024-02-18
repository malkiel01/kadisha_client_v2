import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import { NavLink } from 'react-router-dom'
import { Fragment } from 'react';

const NavSide = ({ data, handleDrawerToggle, mobileOpen , window}) => {

    const drawerWidth = 240

    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <CssBaseline />
        <Typography variant="h6" sx={{ my: 2 }}>
          תפריט ראשי
        </Typography>
        <Divider />
        <List>
          {data.map((item, index) => (
            <Fragment key={index}>
              <ListItemButton sx={{ textAlign: 'center', width: '100%' }}>
                <NavLink to={item.path} style={{ textDecoration: 'none', margin: '0 3px' , width: '100%' }}>
                  <Typography sx={{ color: 'black' }}>
                    {item.label}
                  </Typography>
                </NavLink>
              </ListItemButton>
              <Box
                sx={{
                    minWidth: '100%',
                    borderBottom: '1.2px solid rgba(224, 224, 224, 0.5)', // Adjust the color and alpha value to your preference
                    borderRadius: '0 8px 8px 0', // Adjust the border radius to match the corners
                  }}/>
            </Fragment>
          ))}
        </List>
      </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
        <nav>
            <Drawer
                dir='rtl'
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                anchor="right" // השתמש ב-anchor כדי לפתוח את ה-Drawer בצד הימני
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    right: 0, // פתח את ה-Drawer מהצד הימני
                    },
                }}>
                <Toolbar sx={{ ml: 1 , dir: 'rtl'}}></Toolbar>
                {drawer}
            </Drawer>
        </nav>
    );
  }
  
  export default NavSide;
  