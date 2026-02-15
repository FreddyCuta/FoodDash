DROP TABLE IF EXISTS Platos CASCADE;

DROP TABLE IF EXISTS Restaurantes CASCADE;

DROP TABLE IF EXISTS Pedidos CASCADE;

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

CREATE TABLE Pedidos(
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    correo_cliente VARCHAR(100) NOT NULL,
    telefono_cliente INT NOT NULL,
    plato_id INT REFERENCES Platos(id) NOT NULL,
    cantidad INT NOT NULL,
    total DECIMAL(7,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Restaurantes (nombre, descripcion, facultad, numero, calificacion) VALUES
('Todo light', 'Los mejores precios pero baje de barriga', 'FIIS', 987654321, 4.5),
('Veli FIIS', 'Delicioso pero te llega en una hora', 'FIIS', 963852741, 4.0),
('Meche', 'Nadie se acuerda de meche', 'FIIS', 987635241, 3.5),
('El hueco', 'Comida casera con sabor a hogar', 'FIQT', 987654123, 4.2),
('Último Refugio', 'Auténtica comida peruana con sazón tradicional', 'FIC', 987654321, 4.8);

INSERT INTO Platos (nombre, descripcion, precio, restaurante_id, calificacion) VALUES
-- Restaurante 1
('Solterito de Quinua', 'Quinua, queso fresco, habas y tomate', 11.00, 1, 4.3),
('Tacu Tacu Light', 'Frejoles y arroz salteados versión saludable', 13.00, 1, 4.1),
('Papa Rellena al Horno', 'Papa rellena horneada baja en grasa', 9.50, 1, 4.2),
('Sudado de Pescado Light', 'Pescado cocido con tomate y cebolla', 14.00, 1, 4.4),
('Causa de Atún Light', 'Causa ligera rellena de atún', 10.00, 1, 4.0),
('Tortilla de Verduras', 'Tortilla de espinaca y champiñones', 8.50, 1, 4.1),
('Pollo a la Plancha', 'Pechuga de pollo con ensalada fresca', 12.00, 1, 4.6),
('Quinotto de Verduras', 'Risotto de quinua con vegetales', 13.50, 1, 4.5),

-- Restaurante 2
('Chaufa Especial', 'Arroz chaufa con pollo y verduras', 13.00, 2, 4.4),
('Tallarin Saltado', 'Tallarines salteados estilo criollo', 12.50, 2, 4.2),
('Mostrito', 'Arroz chaufa con pollo a la brasa', 14.00, 2, 4.6),
('Seco de Res', 'Carne guisada con arroz y frejoles', 15.00, 2, 4.3),
('Carapulcra', 'Guiso tradicional con papa seca', 12.00, 2, 4.1),
('Anticuchos', 'Brochetas de corazón con papas', 10.00, 2, 4.7),
('Papa a la Huancaina', 'Papa con salsa cremosa de ají amarillo', 8.50, 2, 4.0),
('Aguadito de Pollo', 'Sopa criolla con arroz y cilantro', 9.00, 2, 4.2),

-- Restaurante 3
('Arroz con Pollo', 'Arroz verde con pollo y ensalada', 13.50, 3, 4.4),
('Seco de Cabrito', 'Cabrito guisado con frejoles', 16.00, 3, 4.5),
('Olluquito con Charqui', 'Guiso andino tradicional', 12.50, 3, 4.1),
('Pachamanca', 'Carnes cocidas con hierbas andinas', 18.00, 3, 4.8),
('Chicharron de Cerdo', 'Cerdo crocante con mote', 14.00, 3, 4.6),
('Cau Cau', 'Mondongo guisado con papas', 11.50, 3, 4.0),
('Sopa Criolla', 'Sopa con carne, leche y fideos', 9.50, 3, 4.2),
('Adobo Arequipeño', 'Cerdo adobado con ají panca', 15.00, 3, 4.7),

-- Restaurante 4
('Frejoles con Seco', 'Frejoles con carne guisada', 12.00, 4, 4.3),
('Arroz Tapado', 'Arroz relleno de carne molida', 11.00, 4, 4.2),
('Menestron', 'Sopa italiana versión peruana', 10.50, 4, 4.4),
('Escabeche de Pollo', 'Pollo marinado con cebolla', 11.50, 4, 4.1),
('Tamales Criollos', 'Tamales de maíz rellenos', 7.50, 4, 4.0),
('Chupe de Camarones', 'Sopa espesa con camarones', 17.00, 4, 4.8),
('Sudado de Mariscos', 'Mariscos cocidos con tomate y ají', 16.00, 4, 4.5),
('Lechon al Horno', 'Cerdo horneado con papas', 15.50, 4, 4.6),

-- Restaurante 5
('Juane', 'Arroz con pollo envuelto en hoja de bijao', 13.00, 5, 4.4),
('Tacacho con Cecina', 'Plátano majado con carne ahumada', 14.50, 5, 4.6),
('Parihuela', 'Sopa concentrada de mariscos', 18.00, 5, 4.9),
('Picante de Cuy', 'Cuy guisado en salsa picante', 17.00, 5, 4.7),
('Malaya Dorada', 'Carne frita crocante', 15.00, 5, 4.5),
('Chanfainita', 'Guiso criollo con mondongo', 10.50, 5, 4.2),
('Patasca', 'Sopa andina con mote', 12.50, 5, 4.3),
('Rocoto Relleno', 'Rocoto relleno estilo arequipeño', 14.00, 5, 4.6);


INSERT INTO Pedidos (nombre_cliente, correo_cliente, telefono_cliente, plato_id, cantidad, total, fecha) VALUES

-- Restaurante 1 (1-8)
('Cliente 1','c1@mail.com',900000001,1,2,22.00,'2026-02-01 12:00:00'),
('Cliente 2','c2@mail.com',900000002,2,1,13.00,'2026-02-01 13:00:00'),
('Cliente 3','c3@mail.com',900000003,3,3,28.50,'2026-02-01 14:00:00'),
('Cliente 4','c4@mail.com',900000004,4,1,14.00,'2026-02-02 12:00:00'),
('Cliente 5','c5@mail.com',900000005,5,2,20.00,'2026-02-02 13:00:00'),
('Cliente 6','c6@mail.com',900000006,6,1,8.50,'2026-02-02 14:00:00'),
('Cliente 7','c7@mail.com',900000007,7,4,48.00,'2026-02-03 12:00:00'),
('Cliente 8','c8@mail.com',900000008,8,2,27.00,'2026-02-03 13:00:00'),

-- Restaurante 2 (9-16)
('Cliente 9','c9@mail.com',900000009,9,2,26.00,'2026-02-03 14:00:00'),
('Cliente 10','c10@mail.com',900000010,10,1,12.50,'2026-02-04 12:00:00'),
('Cliente 11','c11@mail.com',900000011,11,3,42.00,'2026-02-04 13:00:00'),
('Cliente 12','c12@mail.com',900000012,12,2,30.00,'2026-02-04 14:00:00'),
('Cliente 13','c13@mail.com',900000013,13,1,12.00,'2026-02-05 12:00:00'),
('Cliente 14','c14@mail.com',900000014,14,5,50.00,'2026-02-05 13:00:00'),
('Cliente 15','c15@mail.com',900000015,15,2,17.00,'2026-02-05 14:00:00'),
('Cliente 16','c16@mail.com',900000016,16,1,9.00,'2026-02-06 12:00:00'),

-- Restaurante 3 (17-24)
('Cliente 17','c17@mail.com',900000017,17,3,40.50,'2026-02-06 13:00:00'),
('Cliente 18','c18@mail.com',900000018,18,2,32.00,'2026-02-06 14:00:00'),
('Cliente 19','c19@mail.com',900000019,19,1,12.50,'2026-02-07 12:00:00'),
('Cliente 20','c20@mail.com',900000020,20,6,108.00,'2026-02-07 13:00:00'),
('Cliente 21','c21@mail.com',900000021,21,2,28.00,'2026-02-07 14:00:00'),
('Cliente 22','c22@mail.com',900000022,22,1,11.50,'2026-02-08 12:00:00'),
('Cliente 23','c23@mail.com',900000023,23,2,19.00,'2026-02-08 13:00:00'),
('Cliente 24','c24@mail.com',900000024,24,4,60.00,'2026-02-08 14:00:00'),

-- Restaurante 4 (25-32)
('Cliente 25','c25@mail.com',900000025,25,2,24.00,'2026-02-09 12:00:00'),
('Cliente 26','c26@mail.com',900000026,26,1,11.00,'2026-02-09 13:00:00'),
('Cliente 27','c27@mail.com',900000027,27,3,31.50,'2026-02-09 14:00:00'),
('Cliente 28','c28@mail.com',900000028,28,2,23.00,'2026-02-10 12:00:00'),
('Cliente 29','c29@mail.com',900000029,29,1,7.50,'2026-02-10 13:00:00'),
('Cliente 30','c30@mail.com',900000030,30,7,119.00,'2026-02-10 14:00:00'),
('Cliente 31','c31@mail.com',900000031,31,3,48.00,'2026-02-11 12:00:00'),
('Cliente 32','c32@mail.com',900000032,32,2,31.00,'2026-02-11 13:00:00'),

-- Restaurante 5 (33-40)
('Cliente 33','c33@mail.com',900000033,33,2,26.00,'2026-02-11 14:00:00'),
('Cliente 34','c34@mail.com',900000034,34,3,43.50,'2026-02-12 12:00:00'),
('Cliente 35','c35@mail.com',900000035,35,8,144.00,'2026-02-12 13:00:00'),
('Cliente 36','c36@mail.com',900000036,36,5,85.00,'2026-02-12 14:00:00'),
('Cliente 37','c37@mail.com',900000037,37,2,30.00,'2026-02-13 12:00:00'),
('Cliente 38','c38@mail.com',900000038,38,1,10.50,'2026-02-13 13:00:00'),
('Cliente 39','c39@mail.com',900000039,39,3,37.50,'2026-02-13 14:00:00'),
('Cliente 40','c40@mail.com',900000040,40,4,56.00,'2026-02-14 12:00:00');
