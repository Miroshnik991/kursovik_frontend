import React, { memo } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import RegisterModal from "../RegisterWindow/RegisterWindow";

function Header(props) {
	const [open, setOpen] = useState(false);
	const [userData, setUser] = useState(false);

  // Обработчик закрытия модального окна
  const handleClose = () => {
    setOpen(false);
  };

  // Обработчик открытия модального окна
  const handleOpen = () => {
    setOpen(true);
  };

  const handleUser = (userData) => {
    setUser(userData);
	props.auth();
  };

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar  position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
						EAS
         		 	</Typography>
					  <Button color="inherit"
					  onClick={handleOpen}>
						{userData.user ? userData.user.name : 'Login'}
						</ Button>
					  <RegisterModal open={open} onClose={handleClose} setUser={handleUser}/>
       	 		</Toolbar>
			</AppBar>
		</Box>
	);
}

export default memo(Header);