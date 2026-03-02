const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const tasksRoutes = require('./routes/tasks.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// 🔥 PRIMERO los middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json()); // ← ESTE DEBE IR ANTES DE LAS RUTAS

// 🔥 DESPUÉS las rutas
app.use('/auth', authRoutes);
app.use(tasksRoutes);

app.listen(3000, () => {
    console.log('🚀 Servidor FoodDash en puerto 3000');
});