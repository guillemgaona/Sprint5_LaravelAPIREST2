import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner, Flex } from '@chakra-ui/react'; // Importa Spinner y Flex

const AdminRoute = () => {
  // 1. Obtenemos tanto el 'user' como el estado de 'loading' del contexto
  const { user, loading } = useAuth();

  // 2. Si el contexto todavía está cargando la información del usuario,
  // mostramos un spinner en lugar de tomar una decisión prematura.
  if (loading) {
    return (
      <Flex height="80vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  // 3. Una vez que la carga ha terminado, ahora sí comprobamos el rol.
  // En este punto, el objeto 'user' ya está completo.
   const isAdmin = user?.roles?.includes('admin');

  // 4. Si es admin, muestra la página anidada (el formulario). Si no, redirige.
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;