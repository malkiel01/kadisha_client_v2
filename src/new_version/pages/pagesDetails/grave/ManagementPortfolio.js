import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      style={{ height: '100%', width: '100%',
        // border: '1px solid brown'
       }}
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          p: 1, 
          height: '100%', width: '100%',
          // border: '1px solid green'
         }}>
          {children}
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
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function ManagementPortfolio({ tabs }) {  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: 400, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="data tabs"
          centered
          sx={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              disabled={tab.disabled}
              {...a11yProps(index)}
              sx={{
                flex: 1,
                borderRight: index < tabs.length - 1 ? 1 : 0,
                borderColor: 'divider',
                borderBottom: value === index ? 2 : 0,
                borderBottomColor: value === index ? 'primary.main' : 'transparent'
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

ManagementPortfolio.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.any.isRequired,
    })
  ).isRequired,
  // הסר את setCurrentTab אם הוא לא נחוץ
};
