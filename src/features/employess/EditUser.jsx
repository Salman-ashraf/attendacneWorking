import {  Button, Container, Dialog, DialogActions, DialogTitle,  Grid, IconButton, MenuItem,  TextField, Tooltip} from '@mui/material'
import React, { useState,useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { updateEmployee } from './employeeSlice';
import EditUserFields from './EditUserFields';



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
    const [user,setUser]=React.useState({fullname:'',email:'',designation:''});


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

    }
    const handleClose = () => {
        setOpen(false);
    };
   const dispatch=useDispatch();
    const handleUpdate=()=>{
        dispatch(
            updateEmployee({
              name: user.fullname,
              designation: user.designation,
              email: user.email,
              id:Number(props.data.id)
            },props.data.id)
          );
          setUser({ fullname: " ", email: " ", designation: " " });
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
            <DialogTitle color="primary">Employee Details</DialogTitle>
              
              <EditUserFields setOpen={setOpen} props={props}/>
          
            </Dialog>

        </>
    )
}
