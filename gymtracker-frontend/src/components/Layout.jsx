import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useBreakpointValue } from '@chakra-ui/react'; // <-- Importa useBreakpointValue
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // useBreakpointValue nos permite cambiar valores según el tamaño de la pantalla
  // isDesktop será 'true' en pantallas 'md' y superiores
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  return (
    <Box>
      {/* El área de activación por hover solo se renderiza si estamos en escritorio */}
      {isDesktop && (
        <Box
          position="fixed"
          left="0"
          top="0"
          bottom="0"
          w="20px"
          onMouseEnter={handleOpenSidebar}
          zIndex="overlay"
        />
      )}

      {/* Pasamos la función para abrir el sidebar al Navbar */}
      <Navbar onOpenSidebar={handleOpenSidebar} />

      {/* El Sidebar ahora se cierra al pasar el ratón por fuera (en escritorio) */}
      {/* o al hacer clic en el overlay (en móvil) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onMouseLeave={isDesktop ? handleCloseSidebar : undefined}
      />

      <Box as="main" p={8}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;