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
  IconButton,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { FaBars } from 'react-icons/fa';


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
      {}
      <IconButton
        aria-label="Open menu"
        icon={<FaBars />}
        display={{ base: 'flex', md: 'none' }} 
        onClick={onOpenSidebar}
        mr={4}
      />
      
      <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
        <Link as={RouterLink} to="/app/dashboard" _hover={{ textDecoration: 'none' }}>GymTracker</Link>
      </Heading>

      <Spacer />

      {}
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