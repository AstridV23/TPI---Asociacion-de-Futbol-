import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [rol, setRol] = useState(localStorage.getItem('rol') ? parseInt(localStorage.getItem('rol'), 10) : 0);
  const [idUsuario, setIdUsuario] = useState(localStorage.getItem('idUsuario') || null);

  // Función para iniciar sesión
  const login = (userToken, userRol, userId, userName) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('rol', userRol);
    localStorage.setItem('idUsuario', userId);
    localStorage.setItem('nombreUsuario', userName);
    setToken(userToken);
    setRol(userRol);
    setIdUsuario(userId);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('nombreUsuario');
    setToken(null);
    setRol(0);
    setIdUsuario(null);
  };
  

  const value = {
    token,
    rol,
    idUsuario,
    login,
    logout, 
    hayUsuario: () => !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
      throw new Error('useAuth tiene que usarse con AuthProvider');
  }

  const logoutWithNavigation = () => {
      context.logout();
      navigate('/');
  };

  return {
      ...context,
      logout: logoutWithNavigation
  };
};