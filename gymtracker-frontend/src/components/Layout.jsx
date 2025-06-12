// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="blue.500"
        color="white"
      >
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          GymTracker
        </Heading>
        <Box>
          <Link as={RouterLink} to="/dashboard" p={2} mr={2}>
            Dashboard
          </Link>
          <Link as={RouterLink} to="/exercises" p={2} mr={2}>
            Exercises
          </Link>
          <Link as={RouterLink} to="/sessions" p={2} mr={4}>
            My Sessions
          </Link>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout ({user?.name})
          </Button>
        </Box>
      </Flex>
      <Box p={8}>
        <Outlet /> {/* Aquí se renderizarán las páginas hijas */}
      </Box>
    </Box>
  );
};

export default Layout;