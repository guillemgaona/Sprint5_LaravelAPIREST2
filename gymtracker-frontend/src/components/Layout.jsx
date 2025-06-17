import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  return (
    <Box>
      {/* 1. Área invisible a la izquierda para activar el sidebar */}
      <Box
        position="fixed"
        left="0"
        top="0"
        bottom="0"
        w="20px" // Ancho del área de activación
        onMouseEnter={handleOpenSidebar}
        zIndex="10" // Para que esté por encima de otras áreas pero debajo del sidebar
      />

      {/* 2. El Navbar siempre visible en la parte superior */}
      <Navbar />

      {/* 3. El Sidebar desplegable (Drawer) */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* 4. El contenido principal de la página */}
      {/* La zona donde se activará el sidebar al salir (onMouseLeave) */}
      <Box as="main" p={8} onMouseEnter={handleCloseSidebar}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;