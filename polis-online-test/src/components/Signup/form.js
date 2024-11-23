import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box, RadioGroup, FormControl, FormControlLabel, Radio, FormLabel } from '@mui/material';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';

const SignupForm = () => {
  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    sex: '',
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required('Имя обязательно'),
    lname: Yup.string().required('Фамилия обязательно'),
    email: Yup.string()
      .email('Некорректный адрес электронной почты')
      .required('Электронная почта обязательна'),
      password: Yup.string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Пароль должен содержать буквы, цифры и специальные символы'
      )
      .required('Пароль обязателен'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтверждение пароля обязательно'),
    sex: Yup.string().required('Пол обязателен'), 
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);
      console.log('Form Submitted Successfully:', response.data);
      Swal.fire({ title: 'успешно!', text: 'Форма успешно отправлена.', icon: 'success', confirmButtonText: 'ладно', });
      resetForm();
    } catch (error) {
      Swal.fire({ title: 'неуспешно (((', text: 'Форма неуспешно отправлена.', icon: 'error', confirmButtonText: 'опять', });
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '600px',
              margin: 'auto',
              mt: 4,
            }}
          >

            {/* Name Fields */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Имя"
                  name="fname"
                  value={values.fname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fname && Boolean(errors.fname)}
                  helperText={touched.fname && errors.fname}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="фамилия"
                  name="lname"
                  value={values.lname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lname && Boolean(errors.lname)}
                  helperText={touched.lname && errors.lname}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* Email Field */}
            <TextField
              label="Электронная почта"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              variant="outlined"
              fullWidth
            />

            {/* Sex Field (Radio Input) */}
            <FormControl component="fieldset" error={touched.sex && Boolean(errors.sex)}>
              <FormLabel component="legend">Пол</FormLabel>
              <RadioGroup
                name="sex"
                value={values.sex}
                onChange={handleChange}
                onBlur={handleBlur}
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                <FormControlLabel value="female" control={<Radio />} label="Женский" />
              </RadioGroup>
              {touched.sex && errors.sex && (
                <Box sx={{ color: 'red', fontSize: '0.8rem', mt: 1 }}>{errors.sex}</Box>
              )}
            </FormControl>
            
            {/* Password Field */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Пароль"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            <Grid item xs={12} md={6}>
              {/* Confirm Password Field */}
                <TextField
                  label="Подтвердите пароль"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
