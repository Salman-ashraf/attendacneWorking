import { Avatar, Button, ButtonGroup, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, IconButton, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';


const designations = [
    {
        value: 'Senior Web Developer',
        label: 'Senior Web Developer',
    },
    {
        value: 'Graphic Designer',
        label: 'Graphic Designer',
    },
    {
        value: 'Junior Web Developer',
        label: 'Junior Web Developer',
    },
    {
        value: 'HR',
        label: 'HR',
    },
];


export default function EditUser(props) {
    const [user,setUser]=React.useState({fullname:'',email:'',designation:'',rid:''});

 
    const [open, setOpen] = useState(false);
     useEffect(() => {
      setUser({
        fullname:props.data.name,
        email:props.data.email,
        designation:props.data.designation
      })
     }, [])
     
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handlechanges=(e)=>{
        setUser(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
      console.log(user)
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (

        <>
            <Tooltip title="Edit" >
          
                    <IconButton color="primary" aria-label="edit" onClick={() => setOpen(true)}>
                        <EditIcon />
                    </IconButton>
           
            </Tooltip>

            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>User Details</DialogTitle>
                <Container>
                
            
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fullname"
                        name="fullname"
                        label="Full name"
                        fullWidth
                        autoComplete="given-fullname"
                        variant="standard"
                        onChange={handlechanges}
                        value={user.fullname}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        type='email'
                        label="Email"
                        fullWidth
                        autoComplete="given-email"
                        variant="standard"
                        onChange={handlechanges}
                        value={user.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="designation"
                        name="designation"
                        select
                        label="Designation"
                        fullWidth
                        helperText="Please select  designation"
                        variant="standard"
                        onChange={handlechanges}
                        value={user.designation}
                    >
                        {designations.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>



                <Grid item xs={12}>

                </Grid>
            </Grid>


                <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button  onClick={handleClose}>Update</Button>
                    </DialogActions>
                </Container>
          
            </Dialog>

        </>
    )
}
