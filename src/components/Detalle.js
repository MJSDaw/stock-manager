// src/components/Detalle.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetchProducto();
  }, [id]);

  const fetchProducto = async () => {
    try {
      const response = await axios.get(`http://localhost/proyecto-stock/backend/api/detail.php?id=${id}`);
      setProducto(response.data);
    } catch (error) {
      console.error('Error al obtener el detalle del producto:', error);
      alert('Error al obtener el detalle del producto');
    }
  };

  if (!producto) return <div>Cargando...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center">Detalle del Producto</h1>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text"><strong>Nombre Corto:</strong> {producto.nombre_corto}</p>
          <p className="card-text"><strong>Descripción:</strong> {producto.descripcion}</p>
          <p className="card-text"><strong>PVP:</strong> €{producto.pvp}</p>
          <p className="card-text"><strong>Familia:</strong> {producto.familia}</p>
          <Link to="/" className="btn btn-secondary">Volver al listado</Link>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
