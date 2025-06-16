// src/pages/DashboardPage.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Box, Heading, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box p={8}>
      <Heading>Welcome to your Dashboard, {user?.name || 'User'}!</Heading>
      <Text mt={4}>You are logged in.</Text>
      <Button mt={4} colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default DashboardPage;