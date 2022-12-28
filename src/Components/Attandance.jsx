import { Container, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttandanceTable from './SubComponents/AttandanceTable';
export default function Attandance() {
    const [value, setValue] = React.useState(function getPreviousDay(date = new Date()) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
      
        return previous;
      });
    
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
