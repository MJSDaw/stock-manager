import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Actualizar = () => {
  const { id } = useParams();
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
    fetchProducto();
    fetchFamilias();
    // eslint-disable-next-line
  }, [id]);
  
  const fetchProducto = async () => {
    try {
      const response = await axios.get(`http://localhost/proyecto-stock/backend/api/detail.php?id=${id}`);
      setForm({
        nombre: response.data.nombre,
        nombre_corto: response.data.nombre_corto,
        descripcion: response.data.descripcion,
        pvp: response.data.pvp,
        familia: response.data.familia // Asegúrate de que este valor coincide con el cod de la familia
      });
    } catch (error) {
      console.error('Error al obtener el detalle del producto:', error);
      alert('Error al obtener el detalle del producto');
    }
  };

  const fetchFamilias = async () => {
    try {
      const response = await axios.get('http://localhost/proyecto-stock/backend/api/familias.php');
      setFamilias(response.data); // Asegúrate de que el formato es [{ cod: '...', nombre: '...' }]
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
      await axios.put(`http://localhost/proyecto-stock/backend/api/update.php`, { id, ...form });
      alert('Producto actualizado exitosamente');
      navigate('/'); // Redirigir al listado de productos
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Actualizar Producto</h1>
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
          <label>Familia: </label>
          <select name="familia" value={form.familia} onChange={handleChange} required>
            <option value="">Selecciona una familia</option>
            {familias.map(familia => (
              <option key={familia.cod} value={familia.cod}>
                {familia.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
      <br />
      <Link to="/" className="btn btn-secondary">Volver al listado</Link>
    </div>
  );
};

export default Actualizar;
