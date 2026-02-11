import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RealizarPedido.css'; 

const RealizarPedido = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extraemos el plato con seguridad
    const plato = location.state?.plato;

    const [cantidad, setCantidad] = useState(1);
    const [datos, setDatos] = useState({
        nombre_cliente: '',
        correo_cliente: '',
        telefono_cliente: ''
    });

    // Manejo de carga/error si no hay datos
    if (!plato) {
        return <div className="main-container"><h3>Cargando datos del pedido...</h3><button onClick={() => navigate(-1)}>Volver</button></div>;
    }

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

const handleSubmit = async () => {
    // 1. Calculamos el precio
    const precioNumerico = parseFloat(plato.precio) || 0;

    // 2. Creamos el objeto EXACTO que espera tu tabla de la base de datos
    const pedidoFinal = {
        nombre_cliente: datos.nombre_cliente,
        correo_cliente: datos.correo_cliente,
        telefono_cliente: datos.telefono_cliente,
        cantidad: cantidad,
        plato_id: plato.id_plato, // <--- ¡Ahora sí tendrá valor!
        total: (parseFloat(plato.precio) * cantidad)
    };

    // ESTO ES PARA TI: Abre la consola (F12) y verifica que plato_id NO sea null
    console.log("Enviando este pedido:", pedidoFinal);

    try {
        const response = await fetch('http://localhost:3000/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedidoFinal)
        });

        if (response.ok) {
            alert("¡Pedido confirmado con éxito!");
            navigate('/');
        } else {
            const errorData = await response.json();
            alert("Error del servidor: " + errorData.message);
        }
    } catch (error) {
        console.error("Error en el fetch:", error);
        alert("No se pudo conectar con el servidor.");
    }
};

    return (
        <div className="main-container">
            <button onClick={() => navigate(-1)} className="btn-back">
                ← Volver al menú
            </button>

            <header className="header-pedido">
                <div className="icon-box">🍱</div>
                <div>
                    <h1>Realizar Pedido</h1>
                    <p>Completa el formulario para confirmar tu pedido</p>
                </div>
            </header>

            <div className="grid-layout">
                <section className="card form-section">
                    <h2>Datos del Pedido</h2>
                    <p className="subtitle">Completa tus datos para realizar el pedido</p>

                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input name="nombre_cliente" onChange={handleChange} placeholder="Ej: Carlos Rodriguez" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Correo Institucional</label>
                        <div className="input-wrapper">
                            <span className="input-icon">✉️</span>
                            <input name="correo_cliente" onChange={handleChange} placeholder="Ej: carlos@uni.edu" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Teléfono</label>
                        <div className="input-wrapper">
                            <span className="input-icon">📞</span>
                            <input name="telefono_cliente" onChange={handleChange} placeholder="Ej: +1 555-0101" />
                        </div>
                    </div>
                </section>

                <section className="card summary-section">
                    <h2>Resumen del Pedido</h2>
                    
                    <div className="plato-info">
                        <h3>{plato.nombre}</h3>
                        <span>Sushi Uni</span>
                    </div>

                    <div className="qty-selector">
                        <span>Cantidad</span>
                        <div className="qty-controls">
                            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>−</button>
                            <span className="qty-number">{cantidad}</span>
                            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                        </div>
                    </div>

                    <div className="price-details">
                        <div className="price-row">
                            <span>Precio unitario</span>
                            {/* Ajuste de seguridad aquí */}
                            <span>${(parseFloat(plato.precio) || 0).toFixed(2)}</span>
                        </div>
                        <div className="price-row total">
                            <span>Total</span>
                            <span className="total-amount">
                                ${( (parseFloat(plato.precio) || 0) * cantidad).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button className="btn-confirm" onClick={handleSubmit}>
                        ✔️ Confirmar Pedido
                    </button>
                </section>
            </div>
        </div>
    );
};

export default RealizarPedido;