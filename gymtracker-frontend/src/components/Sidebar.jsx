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
  Box, // <-- ESTA ES LA IMPORTACIÓN QUE FALTABA
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { MdDashboard, MdFitnessCenter, MdTimeline, MdQueryStats, MdExitToApp } from 'react-icons/md';
import { FaUserCog, FaUserShield } from 'react-icons/fa';

// Componente reutilizable para cada enlace del menú
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
  const isAdmin = user?.roles?.includes('admin');

  const handleLogout = () => {
    logout();
    onClose(); // Cierra el sidebar antes de navegar
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
            <NavItem icon={FaUserCog} to="/profile" onClick={onClose}>Profile</NavItem>
            {isAdmin && (
              <NavItem icon={FaUserShield} to="/admin/users" onClick={onClose}>Admin</NavItem>
            )}
          </VStack>
        </DrawerBody>

        {/* Este Box es el que causaba el error porque no estaba importado */}
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