import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, } from './listItems';
import AddButton from './AddButton';
import { Avatar, TextField } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MyTable from './SubComponents/MyTable';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MyTableByDate from './SubComponents/MyTableByDate';

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [value, setValue] = React.useState(function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
  });

 const handeldatechange=(newValue)=>{
  
  console.log(value)
    setValue(newValue.$d);


    //isoformat to local 
    // const birthday2 = new Date("2022-12-05T11:24:00"); 

    // console.log(birthday2)

    //local format to iso

    // console.log(birthday2.toISOString())



  }
  
  // console.log(getPreviousDay());


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Main Navbar */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', backgroundColor: '#ffffff'// keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon color='primary' />
            </IconButton>
            <Typography



              noWrap
              sx={{ flexGrow: 1 }}

            >
              <a href=''>   <img width="100" height="50" src="https://technologyrivers.com/wp-content/uploads/2019/04/technology-rivers.png" className="attachment-full size-full entered lazyloaded" alt="" data-lazy-src="https://technologyrivers.com/wp-content/uploads/2019/04/technology-rivers.png" data-ll-status="loaded" />
              </a>
            </Typography>
            <IconButton color="inherit">

              <Avatar alt="Remy Sharp" src="https://i.ibb.co/7rGgWws/Img1.jpg" />

            </IconButton>
          </Toolbar>
        </AppBar>


        {/* side bar  */}

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon color='primary' />
            </IconButton >
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />

          </List>
        </Drawer>
        
        {/* sidebar end  */}


        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />


          {/* this is main page which is showing productive hours for yesterday Attandance */}

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

<DatePicker
  label="Select a Date"
  value={value}
  onChange={handeldatechange}

  renderInput={(params) => <TextField {...params} />}
/>
</LocalizationProvider>

          </Container>
      


          <MyTable  date={value}/>
         <MyTableByDate/>

          <Copyright sx={{ pt: 4 }} />



        </Box>





        <AddButton />
        
      </Box>




    </ThemeProvider>
  );
}

export default function DashBoard() {
  return <DashboardContent />;
}