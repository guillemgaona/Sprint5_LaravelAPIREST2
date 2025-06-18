import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useBreakpointValue, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  return (
    <Flex direction="column" minHeight="100vh">
      {}
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

      {}
      <Navbar onOpenSidebar={handleOpenSidebar} />

      {}
      <Box as="main" p={8} flex="1">
        <Outlet />
      </Box>

      {}
      <Footer />
    </Flex>
  );
};

export default Layout;