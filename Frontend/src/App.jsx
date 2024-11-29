import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './login/Inicio';
import Registro from './login/Registro';
import Jugadores from './vistas/Jugadores';
import Encargado from './vistas/Encargado';
import Header from './componentes/Header';

function App() {

  return (
    <>
      {/* <Header/> */}
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
