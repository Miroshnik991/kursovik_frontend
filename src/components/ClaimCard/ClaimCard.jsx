import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box, Container, Divider, Grid, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import api from '../../https';

const style = { width: '90%', height: 'auto', display: 'flex', alignItems: 'center'};


function ClaimCard({ claim, flag, setUpdateState}) {
	const [age, setAge] = React.useState('');

  const handleChange = (event) => {
	// console.log('handleChange');
    setAge(event.target.value);
	// setAge(12);
	console.log(age);
	// console.log(age);
	asyncHandler(event.target.value);

	// setTimeout(() => {setAge('')}, 1000);
  };
   
  const asyncHandler = async (age) => {
	console.log(claim.id, age);
	const response = await api.post('/claim/changeState', {claim_id: claim.id, state_id: age});
	setUpdateState(true);
	if (response.data) {
	}
  }

	let chipBackColor = 'orange';
	if (claim.state_id === 1) {
		chipBackColor = '#86e986';
	} else if (claim.state_id === 3) {
		chipBackColor = '#eb5b5b';
	}
	// textAlign='center' borderRight="solid" borderColor="#f4ecfb"
  return (
	// <Container sx={style}>
		<Paper elevation={3} sx={style}>
					<Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
				<Grid item xs={1}  display="flex" justifyContent="center" alignItems="center">
					<Typography variant="body2" color="text.secondary">
						<Typography gutterBottom variant="h5" component="div" paddingTop="10px">
							{claim.id}
						</Typography>
					</Typography>													
				</Grid>
				<Grid item xs={6} display="flex" justifyContent="center" alignItems="center" >
					<Typography variant="body2" color="text.secondary">
						<Typography gutterBottom variant="h5" component="div" paddingTop="10px">
							{claim.description}
						</Typography>
					</Typography>
				</Grid>
				<Grid item xs={4} display="flex" justifyContent="center" alignItems="start" gap="20px">
						<Chip label={`${claim.days_to_complete} дней на выполнение`} />
						<Chip label={claim?.state?.name} sx={{backgroundColor: chipBackColor}} />
				</Grid>
				<Grid item xs={12} display="flex" justifyContent="center" alignItems="center" gap="20px">
				<Typography variant="body2" color="text.secondary" sx={{width: '80%', paddingBottom: '20px'}}>
					{claim.comment}
				</Typography>
				{flag && <FormControl fullWidth sx={{width: "150px"}}>
							<InputLabel id="demo-simple-select-label">State</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={age}
									label="Age"
									onChange={handleChange}
								>
									<MenuItem value={1}>Заявка выполнена</MenuItem>
									{/* <MenuItem value={2}>Twenty</MenuItem> */}
									<MenuItem value={3}>Заявка отклонена</MenuItem>
							</Select>
						</FormControl>}
				</Grid>
				<Grid item xs container spacing={1} display="flex" justifyContent="center" paddingBottom="20px">
				<Grid item xs={10} >
				<Typography variant="body2" color="#454347" >
					{`Пользователь: ${claim?.user?.name}`}
				</Typography>
				</Grid>
				<Grid item xs={10} >
				<Typography variant="body2" color="#454347" >
					{`Дата открытия: ${claim?.creation_date}`}
				</Typography>
				</Grid>
				<Grid item xs={10} >
					{claim.finish_date &&
					<Typography variant="body2" color="#454347" >
						{`Дата закрытия: ${claim?.finish_date}`}
					</Typography>
				}
				</Grid>
				</Grid>
			</Grid>
		</Paper>
  );
}

// PostCard.propTypes = {
//   postData: PropTypes.shape({
//     content: PropTypes.string.isRequired,
//     tags: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       tag_name: PropTypes.string.isRequired,
//     })).isRequired,
//     image: PropTypes.string,
//     user: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//     }).isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default React.memo(ClaimCard);