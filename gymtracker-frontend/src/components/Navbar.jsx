import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Flex, Heading, Spacer, Link, Button, HStack, Text
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggleButton from './ThemeToggleButton'; // <-- 1. Importa el nuevo componente

const Navbar = () => {
  const { user, logout } = useAuth();
  // ... (tu función handleLogout)

  return (
    <Flex as="nav" align="center" justifyContent="space-between" padding="1.5rem" bg="gray.800" color="white" boxShadow="md">
      <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
        <Link as={RouterLink} to="/dashboard" _hover={{ textDecoration: 'none' }}>GymTracker</Link>
      </Heading>

      <Spacer />

      <HStack spacing={4}>
        <Link as={RouterLink} to="/exercises" fontSize="lg" _hover={{ color: 'blue.300' }}>Exercises</Link>
        <Link as={RouterLink} to="/sessions" fontSize="lg" _hover={{ color: 'blue.300' }}>My Sessions</Link>
        <Link as={RouterLink} to="/stats" fontSize="lg" _hover={{ color: 'blue.300' }}>My Stats</Link>
      </HStack>

      <Spacer />
      
      {/* 2. Añadimos el botón junto al saludo de bienvenida */}
      <HStack spacing={4}>
        <Text fontSize="lg" fontWeight="medium">
          Welcome, {user?.name || 'User'}!
        </Text>
        <ThemeToggleButton />
      </HStack>
    </Flex>
  );
};

export default Navbar;