import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    email: 'test@test.com',
    password: 'Password123!'
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Некорректный адрес электронной почты')
      .required('Электронная почта обязательна'),
      password: Yup.string()
      .min(6, 'Пароль должен содержать минимум 6 символов').required('Пароль обязателен'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send form data to the API
      // const res = await axios.post(apiUrl + '/login', values);
      login(values.email, values.password);
      navigate("/my-account"); 
  
      resetForm(); // Reset the form if submission is successful
    } catch (error) {
      // console.error('Error submitting form:', error);
  
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Отправка...' : 'Войти'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
