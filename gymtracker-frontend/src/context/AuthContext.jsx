// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance
        .get('/api/user')
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          // Token inválido, limpiamos
          localStorage.removeItem('authToken');
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axiosInstance.post('/api/login', { email, password });
    const { access_token, user } = response.data;
    localStorage.setItem('authToken', access_token);
    setToken(access_token);
    setUser(user);
  };

  const logout = () => {
    // Opcional: llamar a /api/logout si lo tienes implementado
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};