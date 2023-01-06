
import {Stack} from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
export default function MyButton() {
  return (
<>

<Button variant="text">Text</Button>

<Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
</>
  );
}