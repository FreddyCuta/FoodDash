import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Layout.css'; // Mueve aquí los estilos del sidebar

const Layout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      {/* EL SIDEBAR SOLO SE ESCRIBE AQUÍ UNA VEZ */}
      <aside className="vr-sidebar">
        <div className="vr-brand">
          <div className="vr-logo">🍴</div>
          <div>
            <h3>FoodDash</h3>
            <small>Panel Admin</small>
          </div>
        </div>
        <div className="vr-restaurant">
          <h4>Restaurante {id}</h4>
          <small>ID {id} — Panel</small>
        </div>
        <nav className="vr-nav">
          <button onClick={() => navigate(`/vista-restaurante/${id}`)}>Dashboard</button>
          <button onClick={() => navigate(`/restaurante/${id}/platos`)}>Platos</button>
          <button onClick={() => navigate(`/restaurantes/${id}/pedidos`)}>Pedidos</button>
          <button onClick={() => navigate("/")}>Vista Estudiante</button>
        </nav>
      </aside>

      {/* AQUÍ SE CARGARÁ EL CONTENIDO DE TUS OTRAS PÁGINAS */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;