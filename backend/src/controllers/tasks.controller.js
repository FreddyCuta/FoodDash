const pool = require('../databes');

const getTodosRestaurantes = async (req, res) => {
    try {
    const result = await pool.query('SELECT * FROM Restaurantes');
    res.json(result.rows);
    } catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error al obtener los restaurantes'
    });
    }
}

const getPlatosYTop = async (req, res) => {
    try {
    const {id} = req.params;
    const platos = await pool.query('SELECT  P.NOMBRE, P.DESCRIPCION, P.PRECIO, P.CALIFICACION, R.NOMBRE AS RESTAURANTE FROM PLATOS P JOIN RESTAURANTES R ON R.ID = P.RESTAURANTE_ID WHERE R.ID = $1', [id])
    const topplatos = await pool.query('SELECT P.NOMBRE, P.CALIFICACION, SUM(PE.CANTIDAD) AS TOTAL_VENDIDO, P.PRECIO FROM PEDIDOS PE JOIN PLATOS P ON PE.PLATO_ID = P.ID JOIN RESTAURANTES R ON R.ID = P.RESTAURANTE_ID WHERE R.ID = $1 GROUP BY P.NOMBRE, P.CALIFICACION, P.PRECIO ORDER BY TOTAL_VENDIDO DESC LIMIT 5', [id]);
    res.json({
        platos: platos.rows,
        topplatos: topplatos.rows
    });

    } catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error al obtener los platos'
    });
    }
}


const createPlato = async (req, res) => {
    try {
        const {nombre, descripcion, precio, restaurante_id, calificacion} = req.body;
    const result = await pool.query('INSERT INTO Platos (nombre, descripcion, precio, restaurante_id, calificacion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
         [nombre, descripcion, precio, restaurante_id, calificacion]);

    console.log(result);     
    res.send('Creando una tarea')
        }
   catch (error) {
        console.error(error);
        res.status(500).json({
        message: 'Error al crear el plato, algo falla mascota'
        });
    }
}

const deletePlato = async (req, res) => {
    try {
    const {id} = req.params;
    const result = await pool.query('DELETE FROM Platos WHERE id = $1', [id]);

    console.log(result);
    res.send('Eliminando una tarea');
    }
    catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error al eliminar el plato'
    });
    }
}

const updatePlato = async (req, res) => {
    try {
    const {id} = req.params;
    const {nombre} = req.body;

    const result = await pool.query('UPDATE Platos SET nombre = $1 WHERE id = $2', [nombre, id]);
    res.json({
        message: 'Plato actualizado',
        result: result.rows[0]
    });
    }   
    catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error al actualizar el plato'
    });
}
}

module.exports = {
    getTodosRestaurantes,
    getPlatosYTop,
    createPlato,
    deletePlato,
    updatePlato
}