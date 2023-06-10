import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
  return (
    <Stack
      component="form"
	  sx={{
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
         hiddenLabel
		 id="filled-hidden-label-normal"
		 defaultValue="Normal"
        />
		<TextField
         hiddenLabel
		 id="filled-hidden-label-normal"
		 defaultValue="Normal"
        />
    </Stack>
  );
}