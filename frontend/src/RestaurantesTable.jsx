import { useEffect, useState } from "react";

function RestaurantesTable() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al obtener restaurantes");
        }
        return res.json();
      })
      .then(data => {
        setRestaurantes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando restaurantes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Facultad</th>
          <th>Número</th>
        </tr>
      </thead>
      <tbody>
        {restaurantes.map(r => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.nombre}</td>
            <td>{r.descripcion}</td>
            <td>{r.facultad}</td>
            <td>{r.numero}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RestaurantesTable;
