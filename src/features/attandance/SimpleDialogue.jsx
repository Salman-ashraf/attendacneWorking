import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContents from './DialogContents';
import DetailsIcon from '@mui/icons-material/Details';


export default function SimpleDialogue(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
  
                <DetailsIcon fontSize="medium" />
         
      </Button>

      <DialogContents
        biometricTime={props.biometricTime}
        name={props.name}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />


    </div>
  );
}