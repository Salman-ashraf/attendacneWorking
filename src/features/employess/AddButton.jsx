import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Stack } from "@mui/system";
import { addNewEmployee } from "./employeeSlice";
import { useDispatch } from "react-redux";

const designations = [
  {
    value: "Senior Web Developer",
    label: "Senior Web Developer",
  },
  {
    value: "Graphic Designer",
    label: "Graphic Designer",
  },
  {
    value: "Junior Web Developer",
    label: "Junior Web Developer",
  },
  {
    value: "HR",
    label: "HR",
  },
];

export default function AddButton() {
  const [newEmployee, setNewEmployee] = React.useState({
    fullname: "",
    email: "",
    designation: "",
    rid: "",
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlechanges = (e) => {
    setNewEmployee((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    dispatch(
      addNewEmployee({
        name: newEmployee.fullname,
        designation: newEmployee.designation,
        email: newEmployee.email,
        deviceId: Number(newEmployee.rid)
      })
    );

    setNewEmployee({ fullname: "", email: "", designation: "", rid: "" });
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title="Add"
        sx={{
          position: "fixed",
          top: { xs: "calc(80%)", md: 90 },
          right: { xs: "calc(40%)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>newEmployee Details</DialogTitle>
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
                value={newEmployee.fullname}
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
                value={newEmployee.email}
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
                value={newEmployee.designation}
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
                value={newEmployee.rid}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  );
}
