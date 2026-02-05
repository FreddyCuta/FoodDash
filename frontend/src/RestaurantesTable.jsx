import { useEffect, useState } from "react";
import "./Restaurantes.css";

function RestaurantesTable() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => {
        setRestaurantes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = restaurantes.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="loading">Cargando restaurantes...</p>;

  return (
    <div className="container">
      <h1>Restaurantes Universitarios</h1>
      <p className="subtitle">
        Descubre los menús del día en nuestros restaurantes
      </p>

      <input
        className="search"
        type="text"
        placeholder="Buscar restaurante..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map(r => (
          <div className="card" key={r.id}>
            <div className="card-header">
              <h3>{r.nombre}</h3>
              <span className="rating">⭐ {r.calificacion || "4.5"}</span>
            </div>

            <p className="description">{r.descripcion}</p>

            <div className="location">
              📍 {r.facultad || "Campus Universitario"}
            </div>

            <div className="numero">
              📞 {r.numero}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantesTable;