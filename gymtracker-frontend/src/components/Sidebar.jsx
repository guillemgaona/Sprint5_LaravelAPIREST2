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
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
// Se han quitado FaUserCog y FaUserShield de la siguiente línea
import { MdDashboard, MdFitnessCenter, MdTimeline, MdQueryStats, MdExitToApp } from 'react-icons/md';

// El componente NavItem no necesita cambios
const NavItem = ({ icon, children, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      as={RouterLink}
      to={to}
      onClick={onClick}
      p={3}
      borderRadius="md"
      w="100%"
      bg={isActive ? 'blue.500' : 'transparent'}
      color={isActive ? 'white' : 'gray.700'}
      _hover={{ textDecoration: 'none', bg: 'blue.400', color: 'white' }}
      display="flex"
      alignItems="center"
    >
      <Icon as={icon} mr={4} />
      {children}
    </Link>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // La variable 'isAdmin' ya no es necesaria aquí, pero no molesta si se queda.
  // const isAdmin = user?.roles?.includes('admin'); 

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">GymTracker Menu</DrawerHeader>
        <DrawerBody>
          <VStack align="stretch" spacing={2}>
            <NavItem icon={MdDashboard} to="/dashboard" onClick={onClose}>Dashboard</NavItem>
            <NavItem icon={MdFitnessCenter} to="/exercises" onClick={onClose}>Exercises</NavItem>
            <NavItem icon={MdTimeline} to="/sessions" onClick={onClose}>My Sessions</NavItem>
            <NavItem icon={MdQueryStats} to="/stats" onClick={onClose}>My Stats</NavItem>
            
            {/* --- LÍNEAS ELIMINADAS --- */}
            {/* Se ha quitado el NavItem de Profile */}
            {/* Se ha quitado el NavItem de Admin */}

          </VStack>
        </DrawerBody>
        <Box p={4} borderTopWidth="1px">
          <Button w="100%" colorScheme="red" leftIcon={<MdExitToApp />} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;