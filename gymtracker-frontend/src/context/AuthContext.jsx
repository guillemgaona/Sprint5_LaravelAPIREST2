import React, { createContext, useState, useEffect } from 'react';
import { getAuthenticatedUser, loginUser } from '../api/authService';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('authToken');
    if (tokenFromStorage) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
      
      getAuthenticatedUser()
        .then((response) => {
          // AHORA LA RESPUESTA ES DIRECTAMENTE EL OBJETO DE USUARIO
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []); // Se ejecuta solo una vez al cargar la app

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const { access_token, user: userData } = response.data; // userData es ahora el objeto de usuario
    localStorage.setItem('authToken', access_token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setToken(access_token);
    setUser(userData); // <-- Se guarda directamente el objeto de usuario
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const contextValue = { user, token, login, logout, loading, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};