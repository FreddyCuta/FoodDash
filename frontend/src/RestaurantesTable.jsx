import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // CAMBIO 1: Importar el hook
import "./Restaurantes.css"; 

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // CAMBIO 2: Inicializar el hook

  const categorias = ["Todos", "FIIS", "FAUA", "FIQT"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/restaurantes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener restaurantes");
        }
        return res.json();
      })
      .then((data) => {
        setRestaurantes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Función actualizada para usar navegación interna
  const handleNavigation = (url) => {
    navigate(url); 
  };

  if (loading) return <div className="loading">Cargando la mejor comida...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="main-container">
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🍴</span> FoodDash
        </div>
        <div className="nav-buttons">
          <button 
            className="btn btn-primary"
            /*onClick={() => handleNavigation('/perfil-estudiante')}*/
          >
            Estudiante
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => handleNavigation('/vista-restaurante/1')} //Por defecto estoy poniendo la vista del primer restaurante, posteriormente con el login esto se corregirá
          >
            🏢 Restaurante
          </button>
        </div>
      </nav>

      {/* --- HERO HEADER --- */}
      <header className="page-header">
        <div className="header-icon-bg">🍴</div>
        <div className="header-text">
          <h1>Restaurantes del Campus</h1>
          <p>Descubre y ordena de los mejores lugares para comer</p>
        </div>
      </header>

      {/* --- BUSCADOR Y FILTROS --- */}
      <div className="controls-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Buscar restaurante..." />
        </div>
        
        <div className="filters">
          {categorias.map((cat, index) => (
            <button key={index} className={`filter-tag ${index === 0 ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID DE TARJETAS --- */}
      <div className="restaurant-grid">
        {restaurantes.map((r) => (
          <div 
            key={r.id} 
            className="card"
            onClick={() => handleNavigation(`/restaurante/${r.id}`)} // Ahora usa navigate interno
          >
            <div className="card-image-container">
              <img 
                src={r.imagen || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={r.nombre} 
                className="card-image" 
              />
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <h3>{r.nombre}</h3>
                <div className="rating">
                  ⭐️ <span>{r.calificacion || "4.5"}</span>
                </div>
              </div>
              
              <div className="location">
                📍 {r.facultad || "Ubicación desconocida"} - {r.numero ? `Teléfono ${r.numero}` : ""}
              </div>
              
              <p className="description">
                {r.descripcion || "Disfruta de la mejor comida preparada con ingredientes frescos."}
              </p>
              
              <div className="card-footer">
                <small>234 reseñas</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurantes;