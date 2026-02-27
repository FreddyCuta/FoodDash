
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const tasksRoutes = require('./routes/tasks.routes');

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // Tu React
app.use(morgan('dev'));
app.use(express.json()); // Vital para leer los JSON del carrito

// Rutas
app.use(tasksRoutes); // Todas tus rutas empezarán con /api

app.listen(3000, () => {
    console.log('🚀 Servidor FoodDash en puerto 3000');
});