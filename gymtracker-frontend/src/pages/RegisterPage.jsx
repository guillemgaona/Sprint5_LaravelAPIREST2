// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { registerUser } from '../api/authService';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert, AlertIcon, Link, Text
} from '@chakra-ui/react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await registerUser(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Failed to register. Please check your data.');
      console.error(err);
    }
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="50px auto">
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <Heading as="h1" size="lg">Register</Heading>
        {error && <Alert status="error"><AlertIcon />{error}</Alert>}
        {success && <Alert status="success"><AlertIcon />{success}</Alert>}
        
        {/* Campos del formulario */}
        <FormControl isRequired><FormLabel>Name</FormLabel><Input type="text" name="name" onChange={handleChange} /></FormControl>
        <FormControl isRequired><FormLabel>Username</FormLabel><Input type="text" name="username" onChange={handleChange} /></FormControl>
        <FormControl isRequired><FormLabel>Email</FormLabel><Input type="email" name="email" onChange={handleChange} /></FormControl>
        <FormControl isRequired><FormLabel>Password</FormLabel><Input type="password" name="password" onChange={handleChange} /></FormControl>
        <FormControl isRequired><FormLabel>Confirm Password</FormLabel><Input type="password" name="password_confirmation" onChange={handleChange} /></FormControl>

        <Button type="submit" colorScheme="blue" width="full">Register</Button>
        <Text>Already have an account? <Link as={RouterLink} color="blue.500" to="/login">Login here</Link></Text>
      </VStack>
    </Box>
  );
};

export default RegisterPage;