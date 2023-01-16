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
import { addNewEmployee } from "./employeeSlice";
import { alldesgination } from "./allDesignation";

const AddButtonFields = ({ setOpen }) => {

  const [showSuccess,setShowSuccess]=React.useState(false);
  const [showError,setShowError]=React.useState(false);
   const dispatch=useDispatch();
  const theme = useTheme();
  return (
    <>
      <Formik
        initialValues={{
          fullName: "",
          email: "", // 'admin@silverstay.com',
          registraionId: "", // password: 'admin!@#',
          designation: "",
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
          registraionId: Yup.number("Must be a number").required(
            "RegistraionId is required"
          ),
          designation: Yup.string().required("Designation is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {         
            try { 
                dispatch(
                    addNewEmployee({
                      name: values.fullName,
                      designation: values.designation,
                      email: values.email,
                      deviceId: Number(values.registraionId),
                    })
                  ).unwrap()
                  .then((originalPromiseResult) => {
                    console.log('addee success')
                    setShowSuccess(true);
                    setTimeout(() => {
                      setOpen(false)
                    }, 400);
                  })
                  .catch((rejectedValueOrSerializedError) => {
                    setShowError(true);
                    setTimeout(() => {
                      setShowError(false)
                    }, 1000);
                  });
            } catch (err) {
                console.error(err);
                if (scriptedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
            }
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
                sx={{ ...theme.input, mb: 4 }}
              >
                <TextField
                error={Boolean(touched.registraionId && errors.registraionId)}
                variant='standard'
                  id="outlined-adornment-registraionId-add"
                  type="text"
                  value={values.registraionId}
                  name="registraionId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="RegistraionId"
                  inputProps={{}}
                  fullWidth
                />
                {touched.registraionId && errors.registraionId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-registraionId-add"
                  >
                    {errors.registraionId}
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
                    <TextField {...params}    error={Boolean(touched.designation && errors.designation)}   variant='standard'    label="Designation" />
                  )}
                />
              </FormControl>
             {showSuccess&& <Alert severity="success"> Employee added successfully </Alert>}
             {showError&& <Alert severity="error"> Employee Cannot be added </Alert>}
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
                  Create
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
