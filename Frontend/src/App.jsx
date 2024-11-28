import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './login/inicio';
import Registro from './login/registro';
import Jugadores from './vistas/Jugadores';
import Encargado from './vistas/Encargado';

function App() {

  return (
    <>
      <Routes>
        <Route  path='/' element={<Inicio/>} />
        <Route  path='/registro' element={<Registro/>} />
        <Route  path='/jugadores' element={<Jugadores/>} />
        <Route path='/encargado' element={<Encargado/>} />
      </Routes>
      
    </>
  )
}

export default App
