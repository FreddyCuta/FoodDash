const pool = require('../databes');

const getTodosRestaurantes = async (req, res) => {
    const result = await pool.query('SELECT * FROM Restaurantes');
    res.json(result.rows);
}

const getRestaurante = (req, res) => {
    res.send('retornando solo una tarea');
}

const createPlato = async (req, res) => {
    const {nombre, descripcion, precio, restaurante_id} = req.body;
    const result = await pool.query('INSERT INTO Platos (nombre, descripcion, precio, restaurante_id) VALUES ($1, $2, $3, $4)',
         [nombre, descripcion, precio, restaurante_id]);

    console.log(result);     
    res.send('Creando una tarea')
}

const deletePlato = (req, res) => {
    res.send('Eliminando una tarea');
}

const updatePlato = (req, res) => {
    res.send('Actualizando una tarea');
}

module.exports = {
    getTodosRestaurantes,
    getRestaurante,
    createPlato,
    deletePlato,
    updatePlato
}