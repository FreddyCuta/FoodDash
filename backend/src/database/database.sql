-- ------------------------------------------------------
-- LIMPIEZA DE TABLAS
-- ------------------------------------------------------
DROP TABLE IF EXISTS detalle_pedidos CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS platos CASCADE;
DROP TABLE IF EXISTS restaurantes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ------------------------------------------------------
-- USUARIOS
-- ------------------------------------------------------
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol VARCHAR(30) NOT NULL CHECK (rol IN ('admin', 'admin_restaurante', 'cliente')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, password, telefono, rol) VALUES
('Carlos Mendoza', 'carlos@email.com', 'password123', '987654321', 'cliente'),
('Lucía Torres', 'lucia@email.com', 'password123', '912345678', 'cliente'),
('Admin FIIS', 'admin.fiis@uni.pe', 'admin123', '999111222', 'admin_restaurante'),
('Admin FAUA', 'admin.faua@uni.pe', 'admin123', '999222333', 'admin_restaurante'),
('Admin FIQT', 'admin.fiqt@uni.pe', 'admin123', '999333444', 'admin_restaurante'),
('Super Admin', 'root@fooddash.com', 'root123', '900000000', 'admin');

-- ------------------------------------------------------
-- RESTAURANTES
-- ------------------------------------------------------
CREATE TABLE restaurantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    facultad VARCHAR(100),
    numero VARCHAR(20),
    imagen_url TEXT,
    calificacion NUMERIC(2,1) DEFAULT 0 CHECK (calificacion BETWEEN 0 AND 5),
    activo BOOLEAN DEFAULT TRUE,
    admin_id INTEGER NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO restaurantes (nombre, descripcion, facultad, numero, imagen_url, calificacion, admin_id) VALUES
('Sanguchitos FIIS', 'Sánguches y hamburguesas rápidas', 'FIIS', '01-6112233', 'https://images.unsplash.com/photo-1606755962773-d324e2f1b8a0?w=600', 4.6, 3),
('Pollería FAUA', 'Pollo a la brasa y acompañamientos', 'FAUA', '01-6123344', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600', 4.7, 4),
('Chifa FIQT', 'Comida china peruana', 'FIQT', '01-6134455', 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=600', 4.8, 5),
('Pizza y Pastas FIIS', 'Pizzas artesanales y pastas italianas', 'FIIS', '01-6145566', 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=600', 4.5, 3);

-- ------------------------------------------------------
-- PLATOS
-- ------------------------------------------------------
CREATE TABLE platos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    calificacion NUMERIC(2,1) DEFAULT 0 CHECK (calificacion BETWEEN 0 AND 5),
    disponible BOOLEAN DEFAULT TRUE,
    restaurante_id INTEGER NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
);

-- Sanguchitos FIIS (ID 1)
INSERT INTO platos (nombre, descripcion, precio, imagen_url, calificacion, restaurante_id) VALUES
('Sánguche de Chicharrón', 'Pan francés, chicharrón y camote', 18.00, 'https://images.unsplash.com/photo-1606755962773-d324e2f1b8a0?w=400', 4.7, 1),
('Hamburguesa Clásica', 'Carne, queso y lechuga', 15.00, 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400', 4.5, 1),
('Sánguche de Pollo', 'Pollo a la plancha con salsa', 16.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.6, 1),
('Hot Dog Especial', 'Salchicha, queso y papas fritas', 12.00, 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=400', 4.4, 1),
('Ensalada César', 'Lechuga, pollo y aderezo especial', 14.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.6, 1),
('Papas a la Francesa', 'Papas fritas con salsas variadas', 10.00, 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400', 4.3, 1);

-- Pollería FAUA (ID 2)
INSERT INTO platos (nombre, descripcion, precio, imagen_url, calificacion, restaurante_id) VALUES
('1/4 Pollo con papas', 'Pollo a la brasa con papas y ensalada', 22.00, 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400', 4.8, 2),
('1/2 Pollo con ensalada', 'Medio pollo con guarnición', 28.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.7, 2),
('Pollo Entero', 'Para compartir con papas y ensalada', 50.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.9, 2),
('Alitas BBQ', 'Alitas con salsa barbacoa', 20.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.5, 2),
('Ensalada Mixta', 'Lechuga, tomate y huevo', 12.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.6, 2),
('Arroz Chaufa', 'Arroz frito estilo chino-peruano', 18.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.7, 2);

-- Chifa FIQT (ID 3)
INSERT INTO platos (nombre, descripcion, precio, imagen_url, calificacion, restaurante_id) VALUES
('Arroz Chaufa Especial', 'Con langostinos y pollo', 28.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.9, 3),
('Tallarín Saltado de Carne', 'Tallarines con carne y verduras', 30.00, 'https://images.unsplash.com/photo-1604908554025-2c8e52c2fcb8?w=400', 4.7, 3),
('Pollo Chop Suey', 'Pollo con vegetales al wok', 26.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.8, 3),
('Sopa Wantán', 'Sopa tradicional con wantán', 15.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.6, 3),
('Arroz Frito Especial', 'Arroz frito con cerdo', 27.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.7, 3),
('Vegetales Salteados', 'Salteado de verduras frescas', 16.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.5, 3);

-- Pizza y Pastas FIIS (ID 4)
INSERT INTO platos (nombre, descripcion, precio, imagen_url, calificacion, restaurante_id) VALUES
('Pizza Margarita', 'Pizza clásica con tomate y queso', 20.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.8, 4),
('Pizza Pepperoni', 'Con pepperoni y queso extra', 22.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.7, 4),
('Lasaña de Carne', 'Lasaña con carne y bechamel', 25.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.6, 4),
('Spaghetti a la Boloñesa', 'Pasta con salsa boloñesa', 18.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.5, 4),
('Ravioles de Queso', 'Ravioles rellenos de queso', 19.00, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400', 4.6, 4),
('Ensalada Caprese', 'Tomate, mozzarella y albahaca', 15.00, 'https://images.unsplash.com/photo-1604908177522-0408f1c0c7f6?w=400', 4.7, 4);

-- ------------------------------------------------------
-- PEDIDOS (ejemplo)
-- ------------------------------------------------------
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    restaurante_id INTEGER NOT NULL,
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente'
        CHECK (estado IN ('pendiente','confirmado','preparando','enviado','entregado','cancelado')),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_reserva TIMESTAMP,
    direccion_envio TEXT,
    notas TEXT,
    nombre_cliente VARCHAR(150),
    correo_cliente VARCHAR(150),
    telefono_cliente VARCHAR(20),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
);

-- ------------------------------------------------------
-- DETALLE PEDIDOS (ejemplo)
-- ------------------------------------------------------
CREATE TABLE detalle_pedidos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    plato_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (plato_id) REFERENCES platos(id) ON DELETE CASCADE,
    CONSTRAINT unique_plato_por_pedido UNIQUE (pedido_id, plato_id)
);

-- ------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------
CREATE INDEX idx_platos_restaurante ON platos(restaurante_id);
CREATE INDEX idx_detalle_plato ON detalle_pedidos(plato_id);
CREATE INDEX idx_pedidos_restaurante ON pedidos(restaurante_id);
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);