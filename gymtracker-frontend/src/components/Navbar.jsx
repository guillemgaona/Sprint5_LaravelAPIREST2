import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link,
  Button,
  HStack,
  Text,
  IconButton, // <-- Importa IconButton
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { FaBars } from 'react-icons/fa'; // <-- Importa el icono de hamburguesa

// Pasamos la función para abrir el sidebar como una prop
const Navbar = ({ onOpenSidebar }) => {
  const { user } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1.5rem"
      bg="gray.800"
      color="white"
      boxShadow="md"
    >
      {/* Botón de hamburguesa que solo se muestra en pantallas pequeñas ('base' a 'md') */}
      <IconButton
        aria-label="Open menu"
        icon={<FaBars />}
        display={{ base: 'flex', md: 'none' }} // <-- Se muestra en base, se oculta en md y superior
        onClick={onOpenSidebar}
        mr={4}
      />
      
      <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
        <Link as={RouterLink} to="/app/dashboard" _hover={{ textDecoration: 'none' }}>GymTracker</Link>
      </Heading>

      <Spacer />

      {/* Los enlaces de navegación ahora se ocultan en pantallas pequeñas */}
      <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
        <Link as={RouterLink} to="/app/exercises" fontSize="lg" _hover={{ color: 'blue.300' }}>Exercises</Link>
        <Link as={RouterLink} to="/app/sessions" fontSize="lg" _hover={{ color: 'blue.300' }}>My Sessions</Link>
        <Link as={RouterLink} to="/app/stats" fontSize="lg" _hover={{ color: 'blue.300' }}>My Stats</Link>
      </HStack>

      <Spacer />
      
      <Box>
        <Text fontSize="lg" fontWeight="medium">
          Welcome, {user?.name || 'User'}!
        </Text>
      </Box>
    </Flex>
  );
};

export default Navbar;