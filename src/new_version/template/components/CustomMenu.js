import React, { useState, useRef } from 'react';
import { Tooltip, Button, Box, Grid, Typography, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EventIcon from '@mui/icons-material/Event';
import { useContext } from 'react';
import { GlobalContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#2a3a52',
    color: '#ffffff',
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: 0,
    transformOrigin: 'right center', // Adjust origin point to move the arrow within the tooltip
  },
  [`& .MuiTooltip-arrow`]: {
    color: '#2a3a52',
  },
}));

function CustomMenu() {
  const navigate = useNavigate();
  const { setToken } = useContext(GlobalContext); // קבלת הטוקן מהקונטקסט

  const userName = localStorage.getItem('userName')
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleTooltipClose = () => {
    setTimeout(() => {
      if (!ref.current?.matches(':hover')) {
        setOpen(false);
      }
    }, 500);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleIconClick = (message) => {
    console.log(message);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null)
    window.location.reload();
    navigate('/');
  };

  return (
    <Box>
      <CustomTooltip
        title={
          <Box
            ref={ref}
            sx={{
              width: '200px',
              height: '280px',
              backgroundColor: '#2a3a52',
              color: '#ffffff',
              pointerEvents: 'auto',
              padding: 1,
              borderRadius: 1,
            }}
            onMouseEnter={handleTooltipOpen}
            onMouseLeave={handleTooltipClose}
          >
            <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 1 }}>
              ברוכים הבאים!
            </Typography>
            <Typography variant="subtitle3" sx={{ textAlign: 'center', display: 'block', width: '100%' }}>
{userName}
</Typography>

            <Grid container sx={{ mt: 1, height: '74%' }}>
              <Grid container item xs={12} spacing={0} sx={{ height: '49%', display: 'flex', justifyContent: 'space-between' }}>
                <Grid item sx={{ width: '49%' }}>
                  <Box
                    onClick={() => handleIconClick('אזור אישי')}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 1,
                      backgroundColor: '#19202B',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#1f2a3a',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <PersonIcon />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      אזור אישי
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sx={{ width: '49%' }}>
                  <Box
                    onClick={() => handleIconClick('ניהול האתר')}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 1,
                      backgroundColor: '#19202B',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#1f2a3a',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <SettingsIcon />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      ניהול האתר
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={0} sx={{ height: '49%', display: 'flex', justifyContent: 'space-between' }}>
                <Grid item sx={{ width: '49%' }}>
                  <Box
                    onClick={() => handleIconClick('מועדפים')}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 1,
                      backgroundColor: '#19202B',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#1f2a3a',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <EventIcon />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      מועדפים
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sx={{ width: '49%' }}>
                  <Box
                    onClick={handleLogout}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 1,
                      backgroundColor: '#19202B',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#1f2a3a',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <ExitToAppIcon />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      התנתק
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        }
        open={open}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
        placement="bottom"
        leaveDelay={500}
        PopperProps={{
          disablePortal: true,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [80, 0], // Move tooltip 10px to the left
              },
            },
          ],
        }}
      >
        {/* <Button
          onMouseEnter={handleTooltipOpen}
          onMouseLeave={handleTooltipClose}
        >
          רחף עליי
        </Button> */}
        <IconButton color="inherit" sx={{ p: 0.5 }}
          onMouseEnter={handleTooltipOpen}
          onMouseLeave={handleTooltipClose}
        >
          <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
}

export default CustomMenu;
