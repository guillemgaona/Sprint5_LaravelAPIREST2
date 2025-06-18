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
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('authToken', access_token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setToken(access_token);
    setUser(userData);
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