// src/components/Crear.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Crear = () => {
  const [form, setForm] = useState({
    nombre: '',
    nombre_corto: '',
    descripcion: '',
    pvp: '',
    familia: ''
  });
  const [familias, setFamilias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFamilias();
  }, []);

  const fetchFamilias = async () => {
    try {
      const response = await axios.get('http://localhost/proyecto-stock/backend/api/familias.php');
      setFamilias(response.data);
    } catch (error) {
      console.error('Error al obtener las familias:', error);
      alert('Error al obtener las familias');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.nombre_corto || !form.pvp || !form.familia) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
  
    try {
      // Envía la solicitud POST a la API
      await axios.post('http://localhost/proyecto-stock/backend/api/create.php', form);
      alert('Producto creado exitosamente');
      navigate('/'); // Redirige al listado de productos
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Error al crear el producto');
    }
  };
  

  return (
    <div className="container mt-4">
      <h1 className="text-center">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label>Nombre:</label>
          <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Nombre Corto:</label>
          <input type="text" className="form-control" name="nombre_corto" value={form.nombre_corto} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Descripción:</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label>PVP (€):</label>
          <input type="number" step="0.01" className="form-control" name="pvp" value={form.pvp} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Familia:</label>
          <select name="familia" className="form-select" value={form.familia} onChange={handleChange} required>
            <option value="">Selecciona una familia</option>
            {familias.map(fam => (
              <option key={fam.cod} value={fam.nombre}>{fam.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
      <br />
      <Link to="/" className="btn btn-secondary">Volver al listado</Link>
    </div>
  );
};

export default Crear;
