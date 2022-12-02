import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem } from '@mui/material';
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

export default function UserDetails() {
 
    const [user,setUser]=React.useState({fullname:'',email:'',designation:'',rid:''});

    const handlechanges=(e)=>{
        setUser(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
      console.log(user)
    }


    // const handleChange = (event) => {
    //     setDesgination(event.target.value);
    // };


    return (
        <React.Fragment>

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
        </React.Fragment>
    );
}