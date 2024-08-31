import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { TemplateContext } from '../pages/pagesMains/GravesManagers/Graves';
import { GlobalContext } from '../../App';
import { Box, useTheme } from '@mui/material';
import SearchBar from '../pages/pagesTesting/SearchBar';
import CustomMenu from './components/CustomMenu';
import RefreshIcon from '@mui/icons-material/Refresh';
import RefreshButton from './components/refresh';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header() {
  const theme = useTheme();
  const { currentTab, setCurrentTab } = React.useContext(TemplateContext);
  const { title } = React.useContext(GlobalContext);

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <React.Fragment>
      <AppBar
        color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => console.log('test')}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                שכפל לשונית
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <CustomMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '50px' }}
      >
        {/* גריד ימני, צמוד לימין */}
        <Grid item sx={{ position: 'absolute', left: 0, ml: 2 }}>
          <Typography
            style={theme?.customTypography?.typographyHeader}
            color="inherit"
            variant="h5"
            component="h1"
          >
            {title || ''}
          </Typography>
        </Grid>

        {/* גריד אמצעי, ממורכז */}
        <Grid item width={500}>
          <SearchBar />
        </Grid>

        {/* גריד שמאלי, צמוד לשמאל */}
        <Grid item sx={{ position: 'absolute', right: 0, mr: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
          {/* גריד 5 צמוד לשמאל */}
          <Grid item >
            <Button
              sx={{ borderColor: lightColor }}
              variant="outlined"
              color="inherit"
              size="small"
              disabled
            >
              מטלות
            </Button>
          </Grid>

          {/* גריד 6 נוסף שצמוד לשמאל לגריד 5 */}
          <Grid item >
              <RefreshButton />
              {/* <IconButton>
                <RefreshIcon  color="inherit" 
                // sx={{ display: 'block' }}
                 />
              </IconButton> */}
              {/* <IconButton color="inherit">
                <HelpIcon />
              </IconButton> */}
          </Grid>
        </Grid>

      </AppBar>


      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={currentTab} onChange={(event, newValue) => handleTabChange(newValue)} textColor="inherit">
          <Tab label="כללי" />
          <Tab label="הגדרות" />
        </Tabs>
      </AppBar>

    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
