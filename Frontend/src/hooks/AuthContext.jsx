import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [rol, setRol] = useState(localStorage.getItem('rol') || null);
  const [dni, setDni] = useState(localStorage.getItem('dni') || null);

  // Función para iniciar sesión
  const login = (userToken, userRol, userDni) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('rol', userRol);
    setToken(userToken);
    setRol(userRol);
    setDni(userDni);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setToken(null);
    setRol(0);
  };

  const esJugador =()=>{
    //return true;
    return false;
  }
  
  const esEncargado =()=>{
    //return false;
    return true;
  }

  const value = {
    token,
    rol,
    login,
    logout, 
    hayUsuario: () => !token,
    esEncargado,
    esJugador
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