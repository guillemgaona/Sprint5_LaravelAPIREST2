import React, { createContext, useState, useEffect } from 'react';
import { getAuthenticatedUser, loginUser } from '../api/authService'; // Asumiendo que has separado el login
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
          // --- INICIO DE LA CORRECCIÓN CLAVE ---
          // La API envuelve al usuario en una clave "data". Accedemos a ella.
          setUser(response.data.data);
          // --- FIN DE LA CORRECCIÓN CLAVE ---
        })
        .catch(() => {
          // El token es inválido o ha expirado
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]); // Dependemos del token para re-evaluar

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const { access_token, user: userData } = response.data; // Asumiendo que login devuelve el usuario también
    localStorage.setItem('authToken', access_token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setToken(access_token);
    // Asegurarse de que aquí también se guarda el objeto de usuario correcto
    setUser(userData.data || userData); 
  };

  const logout = () => {
    // Idealmente, llamar a /api/logout para invalidar el token en el servidor
    // axiosInstance.post('/api/logout'); 
    localStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};