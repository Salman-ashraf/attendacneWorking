import { Autocomplete, Container, TextField } from '@mui/material'
import React from 'react'
import AttandanceTable from './SubComponents/AttandanceTable'
import { DateRange } from './SubComponents/DateRange'


const top100Films = [
    { label: 'Haider', id:35},
    { label: 'Salman Ashraf', id:23 },
    { label: 'Amir khan', id:33},
    { label: 'Asad', id:20 },
   ]


export const AttandanceByRange = () => {
    const [user,setUser]=React.useState('')




  return (
    <>

<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    


    <Autocomplete
  onChange={(event, newValue) => {
    setUser(newValue);
  }}
disablePortal
id="combo-box-demo"
options={top100Films}
sx={{ width: 300 }}
renderInput={(params) => <TextField {...params} label="Name" />}
/>
     
   
        </Container>


   <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    

    <DateRange/> 
 
    </Container>




 

         <AttandanceTable />

</>
  )
}
