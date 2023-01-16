import * as React from 'react';
import {
  Button, CssBaseline,
  TextField, 
  Link
  , Grid, Box, Typography, Container, Stack
} from '@mui/material';

import { useState } from 'react'


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthLogin } from './AuthLogin';



function Copyright(props) {

  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://technologyrivers.com">
      Technology-Rivers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const [usercredentials,setUsercredentials]=useState({email:'',password:''});

 const handlechange=(e)=>{
        setUsercredentials(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
      //  console.log(usercredentials)
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    console.log(usercredentials);
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          
        <Box>
          <Stack direction='row'>
{/* <FingerprintIcon sx={{color:'green',fontSize:'50px',marginTop:'10px'}}/> */}
<img width="190" height="87" src="https://technologyrivers.com/wp-content/uploads/2019/04/technology-rivers.png" className="attachment-full size-full entered lazyloaded" alt="" data-lazy-src="https://technologyrivers.com/wp-content/uploads/2019/04/technology-rivers.png" data-ll-status="loaded"/>
        </Stack>
        </Box>


       <AuthLogin/>
   
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}