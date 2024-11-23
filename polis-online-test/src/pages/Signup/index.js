import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SignupForm from '../../components/Signup/form';

const Signup = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant='h3' align='center'>Добро пожаловать на страницу регистрации</Typography>
        <SignupForm />    
      </Box>
    </Container>
  );
};

export default Signup;