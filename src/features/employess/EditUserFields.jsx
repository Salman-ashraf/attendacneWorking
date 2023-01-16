import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  DialogActions,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateEmployee } from "./employeeSlice";
import { alldesgination } from "./allDesignation";

const AddButtonFields = ({ setOpen, props }) => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <>
      <Formik
        initialValues={{
          fullName: props.data.name,
          email: props.data.email, // 'admin@silverstay.com',
          designation: props.data.designation,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string()
            .min(3, "Too short")
            .required("Email is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255, "Email must be at most 255 characters")
            .required("Email is required"),
          designation: Yup.string().required("Designation is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          dispatch(
            updateEmployee({
              name: values.fullName,
              designation: values.designation,
              email: values.email,
              id: Number(props.data.id),
            })
          )
            .unwrap()
            .then((originalPromiseResult) => {
              setShowSuccess(true);
              setTimeout(() => {
                setOpen(false);
              }, 400);
            })
            .catch((rejectedValueOrSerializedError) => {
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 1000);
            });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setFieldValue,
          values,
        }) => (
          <Container sx={{ p: 2 }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl
                fullWidth
                sx={{ ...theme.typography.customInput, mb: 4 }}
              >
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  variant="standard"
                  id="outlined-adornment-fullName-add"
                  value={values.fullName}
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Full Name"
                  inputProps={{}}
                  fullWidth
                />
                {touched.fullName && errors.fullName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fullName-add"
                  >
                    {errors.fullName}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                sx={{ ...theme.typography.customInput, mb: 4 }}
              >
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  variant="standard"
                  id="outlined-adornment-email-add"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-add"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                sx={{ ...theme.typography.customInput, mb: 4 }}
              >
                <Autocomplete
                  fullWidth
                  value={values.designation}
                  name="designation"
                  onBlur={handleBlur}
                  onChange={(e, newval) => setFieldValue("designation", newval)}
                  disablePortal
                  options={alldesgination.map((option) => option.label)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(touched.designation && errors.designation)}
                      variant="standard"
                      label="Designation"
                    />
                  )}
                />
              </FormControl>
              {showSuccess && (
                <Alert severity="success">
                  {" "}
                  Employee updated successfully{" "}
                </Alert>
              )}
              {showError && (
                <Alert severity="error"> Employee Cannot be updated </Alert>
              )}
              <DialogActions>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disableElevation
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  Update
                </Button>
              </DialogActions>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default AddButtonFields;
