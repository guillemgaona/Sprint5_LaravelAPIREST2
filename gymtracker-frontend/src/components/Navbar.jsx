import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text, // <-- Importación añadida
  Link, // <-- Importación añadida
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      justifyContent="space-between" // Justifica el contenido
      padding="1.5rem"
      bg="gray.800"
      color="white"
      boxShadow="md"
    >
      {/* Título/Logo a la izquierda */}
      <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
        <Link as={RouterLink} to="/dashboard" _hover={{ textDecoration: 'none' }}>
          GymTracker
        </Link>
      </Heading>
      
      <Spacer />

      {/* Mensaje de bienvenida a la derecha */}
      <Box>
        <Text fontSize="lg">Welcome, {user?.name || 'User'}!</Text>
      </Box>
    </Flex>
  );
};

export default Navbar;