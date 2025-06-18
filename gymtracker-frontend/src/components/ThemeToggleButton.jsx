import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode} 
      isRound={true}
      size="md"
      alignSelf="center"
    />
  );
};

export default ThemeToggleButton;