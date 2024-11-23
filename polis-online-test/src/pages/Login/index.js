import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import LoginForm from '../../components/Login/form';

const Login = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant='h3' align='center'>Войти</Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;