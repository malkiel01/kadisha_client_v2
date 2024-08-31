import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({purchases, burials, grave}) {
  const [value, setValue] = React.useState(0)
  const labelPurchases = 'תיק רכישה'
  const labelBurials = 'תיק קבורה'
  const labelGrave = 'מסמכי הקבר'

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example"
            
            sx={{
              '.MuiTabs-indicator': {
                backgroundColor: '#009be5', // שימוש בצבע המשני של ערכת הנושא
              }
            }}
            >
              <Tab label={labelPurchases} {...a11yProps(0)} />
              <Tab label={labelBurials} {...a11yProps(1)} />
              <Tab label={labelGrave} {...a11yProps(2)} />
            </TabList>
          </Box>
        </TabContext>

      </Box>
      <CustomTabPanel value={value} index={0}>
            {purchases}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
            {burials}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
            {grave}
      </CustomTabPanel>
    </Box>
  );
}