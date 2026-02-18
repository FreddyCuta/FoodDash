import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // NUEVO: Estado para los datos del formulario, persistente
    const [datosCliente, setDatosCliente] = useState(() => {
        const savedDatos = localStorage.getItem('datosCliente');
        return savedDatos ? JSON.parse(savedDatos) : {
            nombre_cliente: '',
            correo_cliente: '',
            telefono_cliente: '',
            direccion_envio: '',
            notas: ''
        };
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Guardar carrito
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // NUEVO: Guardar datos del cliente automáticamente cuando cambien
    useEffect(() => {
        localStorage.setItem('datosCliente', JSON.stringify(datosCliente));
    }, [datosCliente]);

    const addToCart = (producto) => {
        setCart((prevCart) => {
            const itemExistente = prevCart.find(item => item.id === producto.id);
            if (itemExistente) {
                return prevCart.map(item =>
                    item.id === producto.id 
                        ? { ...item, cantidad: item.cantidad + 1 } 
                        : item
                );
            }
            return [...prevCart, { ...producto, cantidad: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const itemExistente = prevCart.find(item => item.id === id);
            if (itemExistente && itemExistente.cantidad > 1) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
                );
            } else {
                return prevCart.filter(item => item.id !== id);
            }
        });
    };
    
    const clearCart = () => {
        setCart([]);
        // También limpiamos las notas, pero quizás quieras dejar el nombre/teléfono
        setDatosCliente(prev => ({...prev, notas: ''})); 
        localStorage.removeItem('cart');
    };

    // NUEVO: Función para actualizar datos desde el componente
    const actualizarDatosCliente = (nuevosDatos) => {
        setDatosCliente(nuevosDatos);
    };

    const total = cart.reduce((acc, item) => acc + (parseFloat(item.precio) * item.cantidad), 0);

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, clearCart, total, 
            user, setUser, 
            datosCliente, actualizarDatosCliente // Exportamos lo nuevo
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);