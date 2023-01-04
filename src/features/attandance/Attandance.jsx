import { Container, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttandanceTable from './AttandanceTable';
import { subDays } from 'date-fns';


export default function Attandance() {
    const [value, setValue] = React.useState(subDays(new Date(),1))

    
     const handeldatechange=(newValue)=>{
      
      console.log(value)
        setValue(newValue.$d);
     }
  return (
<>
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

          <AttandanceTable  date={value}/>
      

</>
  )
}
