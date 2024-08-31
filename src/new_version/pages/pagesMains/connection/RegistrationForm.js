import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { registration } from '../../../../database/queries/queryConnection/connectedQueries';
import { useContext } from 'react';
import { GlobalContext } from '../../../../App';

const RegistrationForm = () => {
  const { token } = useContext(GlobalContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    let valid = true;

    if (!formData.firstName) {
      errors.firstName = 'השדה שדה חובה';
      valid = false;
    }
    if (!formData.lastName) {
      errors.lastName = 'השדה שדה חובה';
      valid = false;
    }
    if (!formData.email) {
      errors.email = 'השדה שדה חובה';
      valid = false;
    }
    if (!formData.password) {
      errors.password = 'לא הוזן סיסמה';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'הסיסמאות אינן תואמות';
      valid = false;
    }

    setErrorMessages(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration Data:', formData);
      registration(formData, token)
    } else {
      console.log('המידע לא נשלח');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="שם פרטי"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={!!errorMessages.firstName}
            helperText={errorMessages.firstName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="שם משפחה"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={!!errorMessages.lastName}
            helperText={errorMessages.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="אימייל"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errorMessages.email}
            helperText={errorMessages.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="סיסמה"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errorMessages.password}
            helperText={errorMessages.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="אישור סיסמה"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!errorMessages.confirmPassword}
            helperText={errorMessages.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            הרשמה
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationForm;
