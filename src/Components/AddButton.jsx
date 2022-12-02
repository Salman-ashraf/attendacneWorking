import { Avatar, Button, ButtonGroup, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, IconButton, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack } from '@mui/system';



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


export default function AddButton() {
    const [user,setUser]=React.useState({fullname:'',email:'',designation:'',rid:''});

 
    const [open, setOpen] = useState(false);

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
            <Tooltip title="Add" sx={{ position: 'fixed', top: {xs:'calc(80%)',md:90}, right: { xs: "calc(40%)", md: 30 } }}>
                <IconButton onClick={() => setOpen(true)}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
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
                    <TextField
                        required
                        id="rid"
                        name="rid"
                        label="Registration-Id"
                        fullWidth
                        autoComplete="given-rid"
                        variant="standard"
                        onChange={handlechanges}
                        value={user.rid}
                    />
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>


                <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button  onClick={handleClose}>Create</Button>
                    </DialogActions>
                </Container>
          
            </Dialog>

        </>
    )
}
