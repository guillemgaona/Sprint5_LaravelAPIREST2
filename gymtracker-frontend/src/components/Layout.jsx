import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useBreakpointValue, Flex } from '@chakra-ui/react'; // <-- Importa Flex
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer'; // <-- 1. Importa el componente Footer

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  return (
    // 2. Usamos Flex como contenedor principal para posicionar el footer
    <Flex direction="column" minHeight="100vh">
      {/* El área de activación por hover y el Sidebar no cambian, ya que tienen posición fija */}
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
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onMouseLeave={isDesktop ? handleCloseSidebar : undefined}
      />

      {/* El Navbar no cambia */}
      <Navbar onOpenSidebar={handleOpenSidebar} />

      {/* 3. El contenido principal ahora tiene flex="1" para que "empuje" al footer hacia abajo */}
      <Box as="main" p={8} flex="1">
        <Outlet />
      </Box>

      {/* 4. Añadimos el Footer al final */}
      <Footer />
    </Flex>
  );
};

export default Layout;