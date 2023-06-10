import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OpenClaim from '../CreateClaim/CreateClaim';
import api from '../../https';
import ClaimsPage from '../ClaimsPage/ClaimsPage';
import RegisterModal from '../RegisterWindow/RegisterWindow';

export function TabPanel(props) {
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

TabPanel.propTypes = {
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

const MyComponent = (props) => {
	return <div>{JSON.stringify(props.data)}</div>
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [updateState, setUpdateState] = React.useState(false);
  const [myClaims, setMyClaims] = React.useState([{}, {}]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const asyncHandler = async () => {
	const response = await api.get('/claim/list');
	if (response.data) {
		setMyClaims(response.data)
	}
  }

  React.useEffect(() => {	
	// mount
	asyncHandler();
  }, [updateState])

  React.useEffect(() => {
	// after update
	if (updateState) {
		setUpdateState(false)
		asyncHandler();
	}
	
  }, [updateState])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Создать заявку" {...a11yProps(0)} />
          <Tab label="Мои заявки" {...a11yProps(1)} />
          <Tab label="Заявки в работе" {...a11yProps(2)} />
		  <Tab label="Закрытые заявки" {...a11yProps(3)} />
		  <Tab label="Отмененные заявки" {...a11yProps(4)} />
		  <Tab label="Заявки всех" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
	  	<OpenClaim setUpdateState={setUpdateState} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClaimsPage claims={myClaims.allClaims} flag={false}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
	  	<ClaimsPage claims={myClaims.pendingClaims} flag={false}/>
      </TabPanel>
	  <TabPanel value={value} index={3}>
	  	<ClaimsPage claims={myClaims.closedClaims} flag={false}/>
      </TabPanel>
	  <TabPanel value={value} index={4}>
	  	<ClaimsPage claims={myClaims.canceledClaims} flag={false}/>
      </TabPanel>
	  <TabPanel value={value} index={5}>
	  	<ClaimsPage claims={myClaims.allPendingClaims} flag={true} setUpdateState={setUpdateState} />
      </TabPanel>
    </Box>
  );
}

