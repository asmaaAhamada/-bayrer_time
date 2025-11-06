
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MorningRemembrances from './MorningRemembrances';
import TravelRemembrances from './TravelRemembrances';
import EveningRemembrances from './EveningRemembrances';
import SleepRemembrances from './SleepRemembrances';
import AfterMealRemembrances from './AfterMealRemembrances';
import GeneralRemembrances from './GeneralRemembrances';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',color:'red' }}>
        <Tabs
  value={value}
  onChange={handleChange}
  aria-label="basic tabs example"
   variant="scrollable"   // يمكن التمرير على الموبايل
        scrollButtons="auto"
  sx={{
    '& .MuiTab-root': {
      color: 'color: theme.palette.primary.contrastText',         // لون التاب الغير مختار
    },
    '& .Mui-selected': {
      color: 'color: theme.palette.primary.contrastText',         // لون التاب المختار
    },
    
  }}
>
  <Tab label="أذكار الصباح" {...a11yProps(0)} />
  <Tab label="أذكار المساء" {...a11yProps(1)} />
  <Tab label="أذكار النوم" {...a11yProps(2)} />
  <Tab label="أذكار مابعد الإفطار" {...a11yProps(3)} />
  <Tab label="أذكار السفر" {...a11yProps(4)} />
  <Tab label="أذكار عامة" {...a11yProps(5)} />
</Tabs>

      </Box>
      <CustomTabPanel value={value} index={0}>
<MorningRemembrances />      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <EveningRemembrances />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <SleepRemembrances />
      </CustomTabPanel>
         <CustomTabPanel value={value} index={3}>
       <AfterMealRemembrances />
      </CustomTabPanel>
         <CustomTabPanel value={value} index={4}>
       <TravelRemembrances />
      </CustomTabPanel>
       <CustomTabPanel value={value} index={5}>
       <GeneralRemembrances />
      </CustomTabPanel>
    </Box>
  );
}