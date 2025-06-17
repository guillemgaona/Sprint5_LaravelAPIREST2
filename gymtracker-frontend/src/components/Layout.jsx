import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mantenemos las dos funciones, pero solo usaremos una en este componente
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  return (
    <Box>
      {/* El área para ABRIR el sidebar sigue igual */}
      <Box
        position="fixed"
        left="0"
        top="0"
        bottom="0"
        w="20px"
        onMouseEnter={handleOpenSidebar}
        zIndex="overlay"
      />

      <Navbar />

      {/* Ahora pasamos handleCloseSidebar tanto a onClose como a onMouseLeave */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onMouseLeave={handleCloseSidebar} // <-- Nueva prop
      />

      {/* El contenido principal ya no necesita ningún evento de ratón */}
      <Box as="main" p={8}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;