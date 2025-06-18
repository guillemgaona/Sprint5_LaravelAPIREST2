import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
  Button,
  Icon,
  Box,
  Flex,
  Spacer, // Spacer ya no es necesario aquí, pero puede quedarse
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { MdDashboard, MdFitnessCenter, MdTimeline, MdQueryStats, MdExitToApp } from 'react-icons/md';
import ThemeToggleButton from './ThemeToggleButton';

// El componente NavItem no necesita cambios
const NavItem = ({ icon, children, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const inactiveColor = useColorModeValue('gray.700', 'whiteAlpha.900');

  return (
    <Link
      as={RouterLink}
      to={to}
      onClick={onClick}
      p={3}
      borderRadius="md"
      w="100%"
      bg={isActive ? 'blue.500' : 'transparent'}
      color={isActive ? 'white' : inactiveColor}
      _hover={{ textDecoration: 'none', bg: 'blue.400', color: 'white' }}
      display="flex"
      alignItems="center"
    >
      <Icon as={icon} mr={4} />
      {children}
    </Link>
  );
};

const Sidebar = ({ isOpen, onClose, onMouseLeave }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent onMouseLeave={onMouseLeave}>
        <DrawerCloseButton />
        
        {/* Cabecera simplificada sin el botón */}
        <DrawerHeader borderBottomWidth="1px">
          GymTracker Menu
        </DrawerHeader>

        <Flex direction="column" justify="space-between" flex="1">
          <DrawerBody>
            <VStack align="stretch" spacing={2} mt={2}>
              <NavItem icon={MdDashboard} to="/app/dashboard" onClick={onClose}>Dashboard</NavItem>
              <NavItem icon={MdFitnessCenter} to="/app/exercises" onClick={onClose}>Exercises</NavItem>
              <NavItem icon={MdTimeline} to="/app/sessions" onClick={onClose}>My Sessions</NavItem>
              <NavItem icon={MdQueryStats} to="/app/stats" onClick={onClose}>My Stats</NavItem>
            </VStack>
          </DrawerBody>

          {/* --- INICIO DE LA CORRECCIÓN --- */}
          {/* Área inferior que ahora contiene ambos botones */}
          <Box p={4} borderTopWidth="1px">
            <Flex justify="space-between" align="center">
              <Button colorScheme="red" leftIcon={<MdExitToApp />} onClick={handleLogout}>
                Logout
              </Button>
              <ThemeToggleButton />
            </Flex>
          </Box>
          {/* --- FIN DE LA CORRECCIÓN --- */}
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;