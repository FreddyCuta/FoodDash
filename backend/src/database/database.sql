-- BORRAR TABLAS SI EXISTEN (Para empezar de cero)
DROP TABLE IF EXISTS Detalle_Pedidos CASCADE;
DROP TABLE IF EXISTS Pedidos CASCADE;
DROP TABLE IF EXISTS Platos CASCADE;
DROP TABLE IF EXISTS Restaurantes CASCADE;
DROP TABLE IF EXISTS Usuarios CASCADE;

-- 1. TABLA DE USUARIOS
-- Aquí distinguimos quién es el alumno y quién es el dueño del local
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Guardaremos el hash, no el texto plano
    rol VARCHAR(20) CHECK (rol IN ('estudiante', 'admin_restaurante')) DEFAULT 'estudiante',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE RESTAURANTES
-- Cada restaurante tiene un 'admin_id' que apunta al dueño
CREATE TABLE Restaurantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    facultad VARCHAR(100),
    imagen_url TEXT,
    calificacion DECIMAL(2,1) DEFAULT 4.5,
    admin_id INT REFERENCES Usuarios(id) ON DELETE SET NULL
);

-- 3. TABLA DE PLATOS (MENÚ)
CREATE TABLE Platos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    imagen_url TEXT,
    restaurante_id INT REFERENCES Restaurantes(id) ON DELETE CASCADE
);

-- 4. TABLA DE PEDIDOS (MAESTRO)
-- Esta es la "cabecera" de la reserva.
CREATE TABLE Pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    restaurante_id INT REFERENCES Restaurantes(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    fecha_reserva TIMESTAMP NOT NULL, -- Día y hora en que el alumno irá
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'pagado', 'entregado', 'cancelado')) DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLA DE DETALLE DE PEDIDOS (DETALLE)
-- Aquí es donde vive la magia del carrito: varios platos en un solo pedido
CREATE TABLE Detalle_Pedidos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES Pedidos(id) ON DELETE CASCADE,
    plato_id INT REFERENCES Platos(id) ON DELETE SET NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL -- Se guarda el precio del momento de la compra
);

-- 1. INSERTAR USUARIOS
-- Contraseñas de ejemplo: 'password123' (En el futuro las encriptaremos con Bcrypt)
INSERT INTO Usuarios (nombre, email, password, rol) VALUES
('Juan Pérez', 'juan.perez@uni.edu.pe', 'password123', 'estudiante'),
('Admin Meche', 'meche@uni.edu.pe', 'admin123', 'admin_restaurante'),
('Admin Veli', 'veli@uni.edu.pe', 'admin123', 'admin_restaurante'),
('Admin Light', 'light@uni.edu.pe', 'admin123', 'admin_restaurante');

-- 2. INSERTAR RESTAURANTES
-- Los vinculamos a los usuarios admin creados arriba
INSERT INTO Restaurantes (nombre, descripcion, facultad, imagen_url, calificacion, admin_id) VALUES
('Meche', 'Los mejores almuerzos caseros de la facultad.', 'FIC', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', 4.2, 2),
('Veli FIIS', 'Especialistas en comida rápida y contundente.', 'FIIS', 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500', 4.8, 3),
('Todo Light', 'Comida saludable para mantener la línea.', 'FIIS', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', 4.5, 4);

-- 3. INSERTAR PLATOS
INSERT INTO Platos (nombre, descripcion, precio, restaurante_id, imagen_url) VALUES
-- Platos de Meche (ID 1)
('Lomo Saltado', 'Carne de res, cebolla, tomate y papas fritas.', 18.00, 1, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'),
('Menú del día', 'Entrada, segundo (Arroz con Pollo) y refresco.', 10.00, 1, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'),
-- Platos de Veli FIIS (ID 2)
('Mostrito', 'Arroz chaufa con ¼ de pollo a la brasa y papas.', 15.50, 2, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=200'),
('Aeropuerto', 'Mezcla de arroz chaufa y tallarín saltado.', 13.00, 2, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=200'),
-- Platos de Todo Light (ID 3)
('Ensalada César', 'Lechuga fresca, crutones y pollo a la plancha.', 12.50, 3, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'),
('Jugo de Papaya', 'Jugo natural de 500ml sin azúcar.', 5.00, 3, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200');

-- 4. INSERTAR UN PEDIDO DE PRUEBA (Para ver si el carrito funciona)
-- Juan Pérez (ID 1) hace un pedido en Veli FIIS (ID 2) para el 20 de febrero a la 1 PM
INSERT INTO Pedidos (usuario_id, restaurante_id, total, fecha_reserva, estado) 
VALUES (1, 2, 28.50, '2025-02-20 13:00:00', 'pendiente');

-- 5. INSERTAR EL DETALLE DEL PEDIDO (Lo que Juan tiene en su carrito)
-- Juan pidió 1 Mostrito (15.50) y 1 Aeropuerto (13.00) = Total 28.50
INSERT INTO Detalle_Pedidos (pedido_id, plato_id, cantidad, precio_unitario) VALUES
(1, 3, 1, 15.50), -- 1 Mostrito
(1, 4, 1, 13.00); -- 1 Aeropuerto