import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Link } from "react-router-dom";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
export const mainListItems = (
  <React.Fragment>

    <ListItemButton to="/signin">
  
      <ListItemIcon>
        <GroupsIcon />


      </ListItemIcon>
  
      <ListItemText primary="Employees" />
    
    </ListItemButton>




    <ListItemButton>
      <ListItemIcon>
        <FingerprintIcon />
      </ListItemIcon>
      <ListItemText primary="Attandance" />
      
    </ListItemButton>



    <ListItemButton to="/bydate">
  
  <ListItemIcon>
 

<CalendarViewMonthIcon/>
  </ListItemIcon>

  <ListItemText primary="Attandance-By-Date" />

</ListItemButton>


   
  </React.Fragment>
);



