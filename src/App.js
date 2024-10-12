// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Crear from './components/Crear';
import Actualizar from './components/Actualizar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/actualizar/:id" element={<Actualizar />} />
      </Routes>
    </Router>
  );
}

export default App;
