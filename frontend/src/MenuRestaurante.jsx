import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MenuRestaurante.css";

function MenuRestaurante() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado para guardar el objeto que viene de la API
  const [data, setData] = useState({ platos: [], topplatos: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/restaurantes/${id}/platos`)
      .then((res) => res.json())
      .then((resultado) => {
        // resultado es { platos: [...], topplatos: [...] }
        setData(resultado);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando menú:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Cargando menú del restaurante...</div>;

  return (
    <div className="menu-container">
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Volver a Restaurantes
      </button>
      
      <div className="menu-layout">
        {/* SECCIÓN IZQUIERDA: LISTA DE TODOS LOS PLATOS */}
        <main className="menu-main">
          <header className="menu-header">
            <h2>Menú Disponible</h2>
            <span>{data.platos.length} platos encontrados</span>
          </header>

          <div className="platos-list">
            {data.platos.map((plato, index) => (
              <div key={index} className="plato-card">
                <div className="plato-info">
                  {/* Accedemos según los nombres de tu Query SQL */}
                  <h3>{plato.nombre}</h3>
                  <p>{plato.descripcion}</p>
                  <div className="plato-stats">
                    <span className="stars">{"⭐".repeat(Math.floor(plato.calificacion || 5))}</span>
                    <span className="rating">{plato.calificacion}</span>
                  </div>
                </div>
                <div className="plato-price-action">
                  <span className="price">${parseFloat(plato.precio).toFixed(2)}</span>
                  <button className="btn-add">📥</button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* SECCIÓN DERECHA: TOP 5 (topplatos) */}
        <aside className="menu-sidebar">
          <div className="ranking-card">
            <h3>🏆 Más Vendidos</h3>
            <div className="ranking-list">
              {data.topplatos.map((plato, index) => (
                <div key={index} className="ranking-item">
                  <span className={`rank-number rank-${index + 1}`}>{index + 1}</span>
                  <div className="rank-info">
                    <p className="rank-name">{plato.nombre}</p>
                    <span className="rank-stats">
                       ⭐ {plato.calificacion} | 🔥 {plato.total_vendido || 0} vendidos
                    </span>
                  </div>
                  <span className="rank-price">${parseFloat(plato.precio).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MenuRestaurante;