import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; 
import './RealizarPedido.css'; 

const RealizarPedido = () => {
    const navigate = useNavigate();
    
    // Extraemos todo lo necesario del Contexto
    // datosCliente y actualizarDatosCliente son los que mantienen la persistencia
    const { 
        cart = [], 
        total = 0, 
        addToCart, 
        removeFromCart, 
        clearCart,
        datosCliente, 
        actualizarDatosCliente 
    } = useCart();

    // 1. Manejador de cambios: Actualiza directamente el estado global
    const handleChange = (e) => {
        actualizarDatosCliente({
            ...datosCliente,
            [e.target.name]: e.target.value
        });
    };

    // 2. Envío del pedido usando los datos del contexto
    const handleSubmit = async () => {
        // Validación básica usando datosCliente
        if (!datosCliente.nombre_cliente || !datosCliente.telefono_cliente || !datosCliente.direccion_envio) {
            alert("Por favor, completa nombre, teléfono y dirección.");
            return;
        }
        
        const pedidoFinal = {
            usuario_id: null, // Invitado
            restaurante_id: cart[0]?.restaurante_id || 1,
            total: total,
            nombre_cliente: datosCliente.nombre_cliente.trim(),
            correo_cliente: datosCliente.correo_cliente?.trim() || null,
            telefono_cliente: datosCliente.telefono_cliente.trim(),
            direccion_envio: datosCliente.direccion_envio.trim(),
            notas: datosCliente.notas?.trim() || "",
            items: cart.map(item => ({
                plato_id: Number(item.id),       // <-- CORRECTO
                cantidad: Number(item.cantidad), // <-- CORRECTO
                precio_unitario: Number(item.precio) // <-- CORRECTO
            }))
        };

        console.log("Enviando pedido persistente:", pedidoFinal);

        try {
            const response = await fetch('http://localhost:3000/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedidoFinal)
            });

            if (response.ok) {
                alert("¡Pedido confirmado con éxito!");
                clearCart?.(); // Esto debería limpiar carrito y quizás notas
                navigate('/');
            } else {
                alert("Hubo un problema al procesar el pedido.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión con el servidor.");
        }
    };

    // Pantalla de carrito vacío
    if (!cart || cart.length === 0) {
        return (
            <div className="rp-main-container">
                <div className="rp-card" style={{ textAlign: 'center', maxWidth: '400px', margin: '100px auto' }}>
                    <h2 style={{ fontSize: '3rem' }}>🛒</h2>
                    <h3>Tu carrito está vacío</h3>
                    <button className="rp-btn-confirm" onClick={() => navigate('/')}>Volver al Menú</button>
                </div>
            </div>
        );
    }

    return (
        <div className="rp-main-container">
            <button onClick={() => navigate(-1)} className="rp-btn-back">← Volver al menú</button>

            <header className="rp-header-pedido">
                <div className="rp-icon-box">🍱</div>
                <div>
                    <h1>Finalizar Pedido</h1>
                    <p>Los datos se guardan automáticamente mientras navegas</p>
                </div>
            </header>

            <div className="rp-grid-layout">
                {/* COLUMNA IZQUIERDA: FORMULARIO PERSISTENTE */}
                <section className="rp-card">
                    <h2>Datos de Entrega</h2>
                    <div className="rp-input-group">
                        <label>Nombre Completo</label>
                        <input 
                            className="rp-input-field"
                            name="nombre_cliente" 
                            placeholder="Ej: Carlos Rodriguez"
                            value={datosCliente.nombre_cliente}
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="rp-input-group" style={{ flex: 1 }}>
                            <label>Teléfono / WhatsApp</label>
                            <input 
                                className="rp-input-field"
                                name="telefono_cliente" 
                                placeholder="987 654 321"
                                value={datosCliente.telefono_cliente}
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="rp-input-group" style={{ flex: 1 }}>
                            <label>Correo</label>
                            <input 
                                className="rp-input-field"
                                name="correo_cliente" 
                                placeholder="carlos@mail.com"
                                value={datosCliente.correo_cliente}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    <div className="rp-input-group">
                        <label>Dirección de Entrega (o Número de Mesa)</label>
                        <input 
                            className="rp-input-field"
                            name="direccion_envio" 
                            placeholder="Av. Las Palmeras 123, Los Olivos..."
                            value={datosCliente.direccion_envio}
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="rp-input-group">
                        <label>Notas adicionales (Opcional)</label>
                        <textarea 
                            className="rp-input-field"
                            name="notas"
                            placeholder="Ej: Traer mucho ají, el timbre no funciona..."
                            style={{ height: '80px', resize: 'none' }}
                            value={datosCliente.notas}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                {/* COLUMNA DERECHA: CARRITO */}
                <section className="rp-card">
                    <h2>Resumen del Carrito</h2>
                    <div className="rp-cart-list">
                        {cart.map((item) => (
                            <div key={item.id} className="rp-cart-item">
                                <div className="rp-item-info">
                                    <p className="rp-item-name">{item.nombre}</p>
                                    <p className="rp-item-price-unit">S/ {Number(item.precio).toFixed(2)}</p>
                                </div>

                                <div className="rp-qty-controls">
                                    <button className="rp-btn-qty" onClick={() => removeFromCart?.(item.id)}> - </button>
                                    <span className="rp-qty-number">{item.cantidad}</span>
                                    <button className="rp-btn-qty" onClick={() => addToCart?.(item)}> + </button>
                                </div>

                                <span className="rp-item-subtotal">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="rp-total-row">
                        <span>Total a pagar</span>
                        <span className="rp-total-amount">S/ {Number(total).toFixed(2)}</span>
                    </div>

                    <button className="rp-btn-confirm" onClick={handleSubmit}>
                        ✔️ Confirmar y Pagar Pedido
                    </button>
                </section>
            </div>
        </div>
    );
};

export default RealizarPedido;