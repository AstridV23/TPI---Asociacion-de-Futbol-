import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';
import Inicio from './login/Inicio';
import Registro from './login/Registro'; 
import Principal from './vistas/Principal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {hayUsuario} = useAuth();

  return (
    <>
      <Routes>
        {/* <Route  path='/' element={<Torneo/>} /> */}
        <Route  path='/' element={<Inicio/>} />
        <Route  path='/registro' element={<Registro/>} />
        <Route  path='/inscripciones' element={<Principal/>} />
      </Routes>

      <ToastContainer 
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
      transition: Bounce/>
      
    </>
  )
}

export default App