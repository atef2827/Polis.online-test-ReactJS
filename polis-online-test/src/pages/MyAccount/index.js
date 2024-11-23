import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from 'hooks/useAuth';

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant='h3' textAlign='center'>мой аккаунт</Typography>
        <Typography variant='body1' textAlign='center'> <b>{user.fname} {user.lname} </b></Typography>
        <Typography variant='body1' textAlign='center'>электронная почта: <b>{user.email}</b></Typography>
        <Typography variant='body1' textAlign='center'>пол: <b>{user.sex === 'male'? "Муж": "Женщина"}</b></Typography>
      </Box>
    </Container>
  );
};

export default MyAccount;