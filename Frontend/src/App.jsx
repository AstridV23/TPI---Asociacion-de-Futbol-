import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';
import Inicio from './login/Inicio';
import Registro from './login/Registro'; 
import Principal from './vistas/Principal';


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
      
    </>
  )
}

export default App