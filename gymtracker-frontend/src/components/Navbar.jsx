import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link,
  HStack,
  Text, // <-- Necesitamos Text para el mensaje de bienvenida
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth(); // Ya no necesitamos 'logout' ni 'navigate' aquí

  return (
    <Flex
      as="nav"
      align="center"
      justifyContent="space-between"
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

      {/* Enlaces de navegación en el centro */}
      <HStack spacing={4}>
        <Link as={RouterLink} to="/exercises" fontSize="lg" _hover={{ color: 'blue.300' }}>
          Exercises
        </Link>
        <Link as={RouterLink} to="/sessions" fontSize="lg" _hover={{ color: 'blue.300' }}>
          My Sessions
        </Link>
        <Link as={RouterLink} to="/stats" fontSize="lg" _hover={{ color: 'blue.300' }}>
          My Stats
        </Link>
      </HStack>

      <Spacer />
      
      {/* Mensaje de bienvenida a la derecha */}
      <Box>
        <Text fontSize="lg" fontWeight="medium">
          Welcome, {user?.name || 'User'}!
        </Text>
      </Box>
    </Flex>
  );
};

export default Navbar;