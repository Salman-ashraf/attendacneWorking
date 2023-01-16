import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, IconButton } from "@mui/material";
import { deleteEmployee } from "./employeeSlice";
import { useDispatch } from "react-redux";

export default function DeletUser(props) {
  const [open, setOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(
      deleteEmployee({
        id: Number(props.id),
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("deleted");
        setShowSuccess(true);
        setTimeout(() => {
          setOpen(false);
        }, 400);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log("error");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      });
  };
  return (
    <div>
      <IconButton
        color="primary"
        aria-label="edit"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon color="primary" />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this user?"}
        </DialogTitle>
        <DialogContent>
          {showSuccess && (
            <Alert severity="success"> Employee deleted successfully </Alert>
          )}
          {showError && (
            <Alert severity="error"> Employee Cannot be deleted </Alert>
          )}
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
