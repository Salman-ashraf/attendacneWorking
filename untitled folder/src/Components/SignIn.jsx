import * as React from 'react';
import {
  Avatar,
  Button, CssBaseline,
  TextField, FormControlLabel,
  Checkbox, Link
  , Grid, Box, Typography, Container
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useState } from 'react'


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/system';


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


       
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
           
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handlechange} 
              value={usercredentials.email}  
             
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlechange} 
              value={usercredentials.password} 
            
           
            />

       

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}