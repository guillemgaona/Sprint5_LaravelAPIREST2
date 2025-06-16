// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = () => {
  const { user } = useAuth();
  
  // Comprueba si el usuario tiene el rol de 'admin'
  const isAdmin = user?.roles?.some(role => role.name === 'admin');

  // Si es admin, renderiza las rutas hijas, si no, redirige al dashboard
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;