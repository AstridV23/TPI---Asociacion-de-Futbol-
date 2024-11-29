import axios from 'axios';
import { useAuth } from './AuthContext';

//comentario ajslfads

const useAxios = (options = {}) => {
  const { token, logout } = useAuth();
  const { ignoreAuthError = false } = options;

  const API_URL = "localhost:3000/api/"

  const axiosInstance = axios.create({
    
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /* axiosInstance.interceptors.request.use(
    (config) => {
      if (token) { 
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log('Token no encontrado. No se puede realizar la solicitud.');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        if (ignoreAuthError) {
          // Si ignoreAuthError es true, no cerramos la sesión y permitimos que el componente maneje el error
          return Promise.reject(error);
        } else {
          toast.error('Su sesión expiró, inicie sesión nuevamente');
          logout();
        }
      }
      return Promise.reject(error); 
    }
  );*/

  return axiosInstance;
};

export default useAxios;