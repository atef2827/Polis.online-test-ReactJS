import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box, RadioGroup, FormControl, FormControlLabel, Radio, FormLabel } from '@mui/material';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

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
      // Send form data to the API
      const res = await axios.post(apiUrl + '/signup', values);
      // console.log('Form Submitted Successfully:', res.data);
  
      // Show success message
      Swal.fire({
        title: 'Успешно!',
        text: res.data.msg,
        icon: 'success',
        confirmButtonText: 'Ладно',
      });
      navigate("/login");
  
      resetForm(); // Reset the form if submission is successful
    } catch (error) {
      console.error('Error submitting form:', error);
  
      // Handle validation errors
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors; // Get validation errors from response
        const errorMessages = Object.values(validationErrors)
          .flat()
          .join('\n'); // Combine all error messages into a single string
  
        Swal.fire({
          title: 'Ошибка проверки данных!',
          text: errorMessages, // Display all validation errors
          icon: 'error',
          confirmButtonText: 'Попробовать снова',
        });
      } else {
        // Handle other server or network errors
        if(error.response.data?.msg){
          Swal.fire({
            title: 'Ошибка!',
            text: error.response.data?.msg,
            icon: 'error',
            confirmButtonText: 'Попробовать снова',
          });
        }else{
          Swal.fire({
            title: 'Ошибка!',
            text: 'Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз.',
            icon: 'error',
            confirmButtonText: 'Попробовать снова',
          });
        }
      }
    } finally {
      setSubmitting(false); // Stop the form from being in the submitting state
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
