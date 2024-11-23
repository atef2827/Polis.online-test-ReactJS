import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SignupForm from '../../components/Signup/form';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant='h3' textAlign='center'>Добро пожаловать на страницу регистрации</Typography>
        <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      maxWidth: '600px',
                      margin: 'auto',
                      mt: 4,
                    }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} sx={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box>
                <Typography variant='h5' textAlign='center'>Мохамед Атеф</Typography>
                <Typography variant='h5' textAlign='center' component="a" target='_blank' href="https://mo-atef.com/ru">смотрите мое резюме</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <SignupForm />    
      </Box>
    </Container>
  );
};

export default Signup;