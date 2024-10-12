import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const Listado = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost/proyecto-stock/backend/api/list.php');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      alert('Error al obtener los productos');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await axios.delete('http://localhost/proyecto-stock/backend/api/delete.php', {
          data: { id }
        });
        alert('Producto eliminado exitosamente');
        fetchProductos();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  return (
    <div className="container mt-4"> {/* Contenedor de Bootstrap con margen superior */}
      <h1 className="text-center">Listado de Productos</h1>
      <Link to="/crear" className="btn btn-primary mb-3">Crear Nuevo Producto</Link>
      <div className="table-responsive"> {/* Para hacer la tabla más responsiva */}
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>
                  <Link to={`/detalle/${prod.id}`} className="btn btn-info btn-sm">Detalle</Link>
                  <Link to={`/actualizar/${prod.id}`} className="btn btn-warning btn-sm mx-1">Actualizar</Link>
                  <button onClick={() => handleDelete(prod.id)} className="btn btn-danger btn-sm">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listado;
