import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner, Flex } from '@chakra-ui/react';

// Aceptamos 'children' como una prop. 'children' será cualquier componente
// que pongamos dentro de <ProtectedRoute> en App.jsx.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mientras el contexto de autenticación está comprobando si hay un usuario,
  // mostramos un spinner para evitar parpadeos o redirecciones incorrectas.
  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  // Si no está autenticado (y ya no está cargando), lo redirigimos a /login.
  // 'replace' evita que el usuario pueda volver a la página anterior con el botón "atrás".
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, simplemente renderizamos los componentes hijos.
  // En nuestro caso, el hijo es el componente <Layout />.
  return children;
};

export default ProtectedRoute;