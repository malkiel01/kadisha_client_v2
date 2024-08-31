import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import TabContentColumns from './TabContentColumns'; // Import the new component

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

export default function ManagementPortfolio({ purchase, burial, documents }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderContent = (content) => {
    return Array.isArray(content) ? <TabContentColumns columns={content} /> : content;
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="data tabs">
          <Tab label="רכישה" {...a11yProps(0)} />
          <Tab label="קבורה" {...a11yProps(1)} />
          <Tab label="מסמכים" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {renderContent(purchase)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderContent(burial)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {renderContent(documents)}
      </TabPanel>
    </Box>
  );
}

ManagementPortfolio.propTypes = {
  purchase: PropTypes.any,
  burial: PropTypes.any,
  documents: PropTypes.any,
};
