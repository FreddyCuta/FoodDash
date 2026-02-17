import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VistaPedidos.css';

const Pedidos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    fetchPedidos();
  }, [id]);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurantes/${id}/pedidos`);
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // FUNCIÓN PARA CAMBIAR EL ESTADO
  const cambiarEstado = async (pedidoId, estado) => {
    try {
      // Llamada al backend
      await fetch(`${import.meta.env.VITE_API_URL}/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      });

      // Actualizar el estado localmente para que la UI cambie de inmediato
      setPedidos(prevPedidos => 
        prevPedidos.map(p => 
          p.id === pedidoId ? { ...p, estado: estado } : p
        )
      );
    } catch (error) {
      alert("No se pudo actualizar el estado");
    }
  };

  const pedidosFiltrados = filtro === 'Todos' 
    ? pedidos 
    : pedidos.filter(p => p.estado === filtro);

  return (
    <div className="admin-container">
      <main className="pedidos-main">
        <header className="pedidos-header">
          <h1>Pedidos</h1>
          <div className="filtros-container">
            {['Todos', 'Pendiente', 'En Proceso', 'Completado'].map(f => (
              <button key={f} className={`filter-btn ${filtro === f ? 'active' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
            ))}
          </div>
        </header>

        <section className="pedidos-list">
          {pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-info">
                <div className="pedido-header-row">
                  <span className="order-id">ORD-{pedido.id.toString().padStart(3, '0')}</span>
                  {/* Badge dinámico según el estado actual */}
                  <span className={`status-badge ${pedido.estado?.replace(/\s+/g, '-').toLowerCase()}`}>
                    {pedido.estado}
                  </span>
                  <span className="price">${parseFloat(pedido.precio).toFixed(2)}</span>
                </div>
                
                <h2 className="dish-name">{pedido.nombre} <span className="qty">x{pedido.cantidad || 1}</span></h2>
                <div className="customer-details">
                   <span>👤 {pedido.nombre_cliente}</span>
                   <span>📞 {pedido.telefono_cliente}</span>
                </div>
                <p className="order-date">{pedido.fechita}</p>
              </div>

              <div className="pedido-actions">
                {/* LÓGICA DE BOTONES DINÁMICOS */}
                {pedido.estado === 'Pendiente' && (
                  <button 
                    className="btn-iniciar" 
                    onClick={() => cambiarEstado(pedido.id, 'En Proceso')}
                  >
                    Iniciar
                  </button>
                )}

                {pedido.estado === 'En Proceso' && (
                  <button 
                    className="btn-completar" 
                    onClick={() => cambiarEstado(pedido.id, 'Completado')}
                  >
                    Completar
                  </button>
                )}

                {pedido.estado === 'Completado' && (
                  <span className="check-done">✅ Finalizado</span>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Pedidos;