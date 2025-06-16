import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar'; // Importa el componente Navbar que creamos
import Footer from './Footer'; // Importa el componente Footer que creamos

const Layout = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      {/* 1. El Navbar siempre estará en la parte superior */}
      <Navbar />

      {/* 2. El contenido principal de la página crecerá para ocupar el espacio disponible */}
      <Box as="main" flex="1" p={8}>
        {/* Outlet renderiza el componente de la ruta actual (Dashboard, Exercises, etc.) */}
        <Outlet />
      </Box>

      {/* 3. El Footer siempre estará en la parte inferior */}
      <Footer />
    </Flex>
  );
};

export default Layout;