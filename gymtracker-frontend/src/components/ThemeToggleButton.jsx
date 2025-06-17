import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = () => {
  // useColorMode es un hook de Chakra que nos da el modo actual y la función para cambiarlo
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} // Muestra el icono opuesto al modo actual
      onClick={toggleColorMode} // Al hacer clic, cambia el modo
      isRound={true}
      size="md"
      alignSelf="center"
    />
  );
};

export default ThemeToggleButton;