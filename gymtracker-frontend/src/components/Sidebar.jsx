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
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { MdDashboard, MdFitnessCenter, MdTimeline, MdQueryStats, MdExitToApp } from 'react-icons/md';

// Componente NavItem (sin cambios)
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

const Sidebar = ({ isOpen, onClose, onMouseLeave }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent onMouseLeave={onMouseLeave}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">GymTracker Menu</DrawerHeader>
        
        <Flex direction="column" justify="space-between" h="100%">
          <DrawerBody>
            <VStack align="stretch" spacing={2}>
              {/* --- INICIO DE LA CORRECCIÓN --- */}
              {/* He vuelto a añadir todos los enlaces de navegación */}
              <NavItem icon={MdDashboard} to="/dashboard" onClick={onClose}>Dashboard</NavItem>
              <NavItem icon={MdFitnessCenter} to="/exercises" onClick={onClose}>Exercises</NavItem>
              <NavItem icon={MdTimeline} to="/sessions" onClick={onClose}>My Sessions</NavItem>
              <NavItem icon={MdQueryStats} to="/stats" onClick={onClose}>My Stats</NavItem>
              {/* --- FIN DE LA CORRECCIÓN --- */}
            </VStack>
          </DrawerBody>

          <Box p={4} borderTopWidth="1px">
            <Button w="100%" colorScheme="red" leftIcon={<MdExitToApp />} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Flex>

      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;