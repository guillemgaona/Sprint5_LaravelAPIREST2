import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      px={8}
      bg="gray.800"
      color="gray.400"
      textAlign="center"
    >
      <Text>
        &copy; {new Date().getFullYear()} GymTracker. Todos los derechos reservados.
      </Text>
    </Box>
  );
};

export default Footer;