import React, { useEffect } from 'react'
import 'react-date-range/dist/styles.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';
import 'react-date-range/dist/theme/default.css';
import { Button, ClickAwayListener, Popper } from '@mui/material';
import { Box } from '@mui/system';

import DateRangeIcon from '@mui/icons-material/DateRange';


export const DateRange = () => {

const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open,setOpen]=useState(false);
  const styles = {
    right:40,
    bgcolor: 'background.paper',
    zIndex:1
  };
 
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

return (
    <>
    <ClickAwayListener
  mouseEvent="onMouseDown"
  touchEvent="onTouchStart"
  onClickAway={handleClickAway}
>
  <Box sx={{ position:'fixed' }}>
  <Button variant="outlined" startIcon={<DateRangeIcon />} onClick={handleClick} size='large'>
        Select Range
      </Button>

    {open ? (
      <Box sx={styles}>
<DateRangePicker

onChange={item => setState([item.selection])}
showSelectionPreview={true}
moveRangeOnFirstSelection={false}
months={2}
ranges={state}
direction="horizontal"
/>
      </Box>
    ) : null}
  </Box>
</ClickAwayListener>


</>
  )
}
