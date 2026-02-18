import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; 
import "./MenuRestaurante.css";

function MenuRestaurante() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart, cart } = useCart(); // Traemos 'cart' para contar los items

  const [data, setData] = useState({ platos: [], restaurante: null });
  const [loading, setLoading] = useState(true);
  
  // Nuevo: Estado para la animación del botón
  const [cartAnimating, setCartAnimating] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/restaurantes/${id}/platos`) 
      .then((res) => res.json())
      .then((resultado) => {
        setData(resultado); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
        setLoading(false);
      });
  }, [id]);

  // Función para agregar y disparar el salto del botón
  const handleAddToCart = (plato) => {
    addToCart(plato);
    setCartAnimating(true);
    // Reiniciamos el estado rápido para que pueda volver a saltar si hacen muchos clics
    setTimeout(() => setCartAnimating(false), 300);
  };

  if (loading) return <div className="loading">Cargando menú...</div>;

  return (
    <div className="main-container">
      <div className="menu-header-top">
        <button className="btn-back-modern" onClick={() => navigate("/")}>
          <span className="arrow">←</span> 
          <span className="text">Restaurantes</span>
        </button>

        {/* El botón ahora tiene la clase 'animate-pop' cuando cartAnimating es true */}
        <button 
          className={`btn-cart-modern ${cartAnimating ? 'animate-pop' : ''}`} 
          onClick={() => navigate("/realizar-pedido")}
        >
          <div className="cart-icon-wrapper">
            <span className="cart-emoji">🛒</span>
            {/* El número ahora es real según los productos en el carrito */}
            <span className="cart-badge">{cart?.length || 0}</span> 
          </div>
          <span className="cart-text">Ver Carrito</span>
        </button>
      </div>

      <div className="restaurant-banner" style={{ 
        backgroundImage: `url(${data.restaurante?.imagen_url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200'})` 
      }}>
        <div className="banner-overlay">
          <span className="category-badge">{data.restaurante?.facultad || "UNI"}</span>
          <h1>{data.restaurante?.nombre || "Restaurante"}</h1> 
          <p>📍 {data.restaurante?.facultad} | ⭐ {data.restaurante?.calificacion || "4.5"} | Abierto ahora</p>
        </div>
      </div>
      
      <div className="grid-layout">
        <main className="menu-main">
          <h2 className="section-title">Menú Disponible</h2>
          <div className="platos-list">
            {data.platos.length > 0 ? (
              data.platos.map((plato) => (
                <div key={plato.id} className="plato-card-premium">
                  <div className="plato-header">
                    <h3>{plato.nombre}</h3>
                    <span className="plato-price">S/ {parseFloat(plato.precio).toFixed(2)}</span>
                  </div>
                  
                  <p className="plato-description">{plato.descripcion}</p>
                  
                  <div className="plato-footer">
                    <div className="plato-rating">
                      <span className="stars">⭐⭐⭐⭐⭐</span>
                      <span className="rating-value">4.7</span>
                      <span className="sold-count">+456 vendidos</span>
                    </div>

                    <button className="btn-add-cart-minimal" onClick={() => handleAddToCart(plato)}>
                      <span className="plus-icon">+</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay platos registrados para este local.</p>
            )}
          </div>
        </main>

        <aside className="menu-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <span className="trophy-icon">🏆</span>
              <h3>Más Vendidos</h3>
            </div>
            <div className="top-platos-list">
              {data.topplatos && data.topplatos.length > 0 ? (
                data.topplatos.map((top, index) => (
                  <div key={top.id} className="top-item-card">
                    <div className="top-rank">{index + 1}</div>
                    <div className="top-info">
                      <span className="top-name">{top.nombre}</span>
                      <div className="top-meta">
                        <span className="stars-mini">⭐⭐⭐⭐⭐</span>
                        <span className="sold-mini">{top.total_vendido || 0} ventas</span>
                      </div>
                    </div>
                    <span className="top-price-mini">S/ {parseFloat(top.precio).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <p className="no-data">Cargando ranking...</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MenuRestaurante;