import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import api from '../../https';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
// import { makeStyles } from '@emotion/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiFormControl-root': {
//       margin: theme.spacing(1),
//       width: '100%',
//     },
//     '& .MuiTypography-root': {
//       margin: theme.spacing(2),
//     },
//   },
// }));

function ClaimForm({ setUpdateState }) {
	const [open, setOpen] = React.useState(false);
//   const classes = useStyles();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
	console.log(title);
    // Обработка отправки данных формы
	asyncHandler();
    setTitle('');
    setText('');
    setDays('');
  }

	const asyncHandler = async () => {
	const response = await api.post('/claim/create', {days_to_complete: days,
    description: text,
    comment: title});
	setUpdateState(true);
  }

// , display: "flex", justifyContent: "center" sx={{display: "flex", justifyContent: "center"}} 

  return (
	<Paper elevation={3} sx={{width: "70%", margin: "0 auto"}}>
		<form onSubmit={handleSubmit}
		//  className={classes.root} 
		
		noValidate>
		<Typography variant="h4" sx={{textAlign: "center", paddingTop: "30px", paddingBottom: "30px"}}>
			Оформить заявку на получение оборудования
		</Typography>
		<Collapse in={open}>
		<Alert variant="filled" severity="success" sx={{width: "50%",  margin: "0 auto"}}>
        	Заявка успешно оформлена!
      	</Alert>
		  </Collapse>
		<Grid container spacing={3} sx={{marginTop: "5px"}}>
			<Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
			<TextField
				sx={{width: "50%"}}
				id="title"
				label="Название заявки"
				placeholder="Прошу предоставить новый монитор"
				variant="outlined"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
			<TextField
				sx={{width: "50%"}}
				id="text"
				label="Текст заявки"
				placeholder="Текст заявки"
				variant="outlined"
				value={text}
				onChange={(e) => setText(e.target.value)}
				multiline
			/>
			</Grid>
			<Grid item xs={12} sx={{display: "flex", justifyContent: "center", width: "120px"}}>
			<TextField
				sx={{width: "50%"}}
				id="days"
				type="number"
				label="Количество дней на выполнение"
				rows={5}
				variant="outlined"
				value={days}
				onChange={(e) => setDays(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sx={{display: "flex", justifyContent: "center", paddingBottom: "30px"}}>
			<Button type="submit" variant="contained" color="primary" onClick={() => {setOpen(true); setTimeout(() => {setOpen(false)}, 3000)}}>Submit</Button>
			</Grid>
		</Grid>
		</form>
	</Paper>
  );
}

export default ClaimForm;