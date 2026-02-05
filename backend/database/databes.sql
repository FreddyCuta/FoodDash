CREATE DATABASE FoodDash;

CREATE TABLE Restaurantes(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    facultad VARCHAR(200) NOT NULL,
    numero INT NOT NULL,
    calificacion INT NOT NULL DEFAULT 0
);

CREATE TABLE Platos(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    restaurante_id INT REFERENCES Restaurantes(id) NOT NULL,
    calificacion INT NOT NULL DEFAULT 0
);

INSERT INTO Restaurantes (nombre, descripcion, facultad, numero, calificacion) VALUES
('Todo light', 'Los mejores precios pero baje de barriga', 'FIIS', 987654321, 4),
('Veli FIIS', 'Delicioso pero te llega en una hora', 'FIIS', 963852741, 3),
('Meche', 'Nadie se acuerda de meche', 'FIIS', 987635241, 2);

INSERT INTO Platos (nombre, descripcion, precio, restaurante_id, calificacion) VALUES
('Ensalada Cesar', 'Lechuga, pollo, queso parmesano y aderezo cesar', 12.50, 1, 4),
('Hamburguesa Veggie', 'Hamburguesa de garbanzos con pan integral', 10.00, 1, 3),
('Sushi Roll', 'Rollos de sushi variados con salsa de soja', 15.00, 2, 5),
('Tacos al Pastor', 'Tacos de cerdo marinados con piña y cebolla', 8.00, 2, 4),
('Lomo Saltado', 'Lomo de res salteado con verduras y papas fritas', 14.00, 3, 5),
('Ceviche Mixto', 'Ceviche de pescado y mariscos con camote y choclo', 13.50, 3, 5);