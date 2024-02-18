import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && ( 
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({data = []}) {

  const theme = useTheme();
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
        <AppBar position="static" sx={{ borderRadius: '25px 25px 0 0' }}>
          <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{
                  borderRadius: '25px 25px 0 0',
                  '& .MuiTab-root': {
                      // backgroundColor: '#F7FAFC',
                      // color: '#475569',
                      backgroundColor: theme.typographyTitle.backgroundColor,
                      color: theme.typographyTitle.color,
                  '&.Mui-selected': {
                      backgroundColor: '#F3F6F9',
                      color: '#2B3541',
                      // backgroundColor: '#000',
                      // color: '#000',
                  },
                  },
                  '& .MuiTabs-indicator': {
                  // backgroundColor: '#FF5733',
                  backgroundColor: '#000',
                  },
              }}
              >
              {data.map((tab, index) => (
                  <Tab key={index} label={tab.name} {...a11yProps(index)} />
              ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >
        {data.map((tab, index) => {
            return (
                <TabPanel key={index} value={value} index={index} dir={theme.direction}>
                    {tab.data}
                </TabPanel>
            )}
        )}
        </SwipeableViews>
    </>
  );
}
