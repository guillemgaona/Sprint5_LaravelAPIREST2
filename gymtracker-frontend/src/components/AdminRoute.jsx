import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner, Flex } from '@chakra-ui/react';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex height="80vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

   const isAdmin = user?.roles?.includes('admin');

  // 4. Si es admin, muestra la página anidada (el formulario). Si no, redirige.
  return isAdmin ? <Outlet /> : <Navigate to="/app/dashboard" replace />;
};

export default AdminRoute;