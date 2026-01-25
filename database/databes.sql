CREATE DATABASE FoodDash;

CREATE TABLE Restaurantes(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(15) NOT NULL,   
);