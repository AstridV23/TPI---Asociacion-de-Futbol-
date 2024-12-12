import  { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [dni, setDni] = useState(localStorage.getItem('dni') ? parseInt(localStorage.getItem('dni'), 10) : 0);
  const [rol, setRol] = useState(localStorage.getItem('rol') || null);

  // Función para iniciar sesión
  const login = ( userRol, userDni) => {
    localStorage.setItem('rol', userRol);
    localStorage.setItem('dni', userDni);
    setRol(userRol);
    setDni(userDni);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('dni');
    localStorage.removeItem('rol');
    setRol(null);
    setDni(null);
  };

  const esJugador =()=>{
    return rol == 'jugador' || rol =='Jugador';
    //return true;
  }
  
  const esEncargado =()=>{
    return rol == 'persona' || rol =='Persona';
  }

  const value = {
    dni,
    rol,
    login,
    logout, 
    hayUsuario: () => !rol,
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