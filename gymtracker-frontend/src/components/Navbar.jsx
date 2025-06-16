import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Link, Button, Heading, Spacer } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Comprobar si el usuario tiene el rol de admin
  const isAdmin = user?.roles?.some(role => role.name === 'admin');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.800"
      color="white"
      boxShadow="md"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          <Link as={RouterLink} to="/dashboard" _hover={{ textDecoration: 'none' }}>
            GymTracker
          </Link>
        </Heading>
      </Flex>

      <Spacer />

      <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
        <Link as={RouterLink} to="/dashboard" p={2} mr={2}>
          Dashboard
        </Link>
        <Link as={RouterLink} to="/exercises" p={2} mr={2}>
          Exercises
        </Link>
        <Link as={RouterLink} to="/sessions" p={2} mr={2}>
          My Sessions
        </Link>
        <Link as={RouterLink} to="/stats" p={2} mr={4}>
          My Stats
        </Link>

        {/* Enlace condicional para el panel de administrador */}
        {isAdmin && (
          <Link as={RouterLink} to="/admin/users" p={2} mr={4} fontWeight="bold" color="yellow.300">
            Admin Panel
          </Link>
        )}

        <Button colorScheme="red" onClick={handleLogout}>
          Logout ({user?.name})
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;