DROP TABLE IF EXISTS Platos CASCADE;

DROP TABLE IF EXISTS Restaurantes CASCADE;

CREATE TABLE Restaurantes(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    facultad VARCHAR(200) NOT NULL,
    numero INT NOT NULL,
    calificacion DECIMAL(2,1) NOT NULL 
);

CREATE TABLE Platos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    restaurante_id INT REFERENCES Restaurantes(id) NOT NULL,
    calificacion DECIMAL(2,1) NOT NULL
);

INSERT INTO Restaurantes (nombre, descripcion, facultad, numero, calificacion) VALUES
('Todo light', 'Los mejores precios pero baje de barriga', 'FIIS', 987654321, 4.5),
('Veli FIIS', 'Delicioso pero te llega en una hora', 'FIIS', 963852741, 4.0),
('Meche', 'Nadie se acuerda de meche', 'FIIS', 987635241, 3.5),
('El hueco', 'Comida casera con sabor a hogar', 'FIQT', 987654123, 4.2),
('Último Refugio', 'Auténtica comida peruana con sazón tradicional', 'FIC', 987654321, 4.8);

INSERT INTO Platos (nombre, descripcion, precio, restaurante_id, calificacion) VALUES
('Ensalada Cesar', 'Lechuga, pollo, queso parmesano y aderezo cesar', 12.50, 1, 4.5),
('Hamburguesa Veggie', 'Hamburguesa de garbanzos con pan integral', 10.00, 1, 4.0),
('Sushi Roll', 'Rollos de sushi variados con salsa de soja', 15.00, 2, 4.2),
('Tacos al Pastor', 'Tacos de cerdo marinados con piña y cebolla', 8.00, 2, 3.8),
('Lomo Saltado', 'Lomo de res salteado con verduras y papas fritas', 14.00, 3, 4.3),
('Ceviche Mixto', 'Ceviche de pescado y mariscos con camote y choclo', 13.50, 3, 4.1),
('Pollo a la Brasa', 'Pollo marinado con especias y asado a la perfección', 11.00, 4, 4.6),
('Arroz con Mariscos', 'Arroz sazonado con mariscos frescos y especias', 16.00, 4, 4.4),
('Aji de Gallina', 'Guiso de pollo deshilachado en salsa de ají amarillo', 9.50, 5, 4.7),
('Causa Limeña', 'Causa de papa amarilla rellena de pollo y mayonesa', 8.50, 5, 4.5);