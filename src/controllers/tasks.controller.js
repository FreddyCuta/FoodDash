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

const getPlatos = async (req, res) => {
    try {
const {id} = req.params;

    const result = await pool.query('SELECT  P.NOMBRE, P.DESCRIPCION, P.PRECIO, R.NOMBRE AS RESTAURANTE FROM PLATOS P JOIN RESTAURANTES R ON R.ID = P.RESTAURANTE_ID WHERE R.ID = $1', [id])
    res.json(result.rows);

    } catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error al obtener los platos'
    });
    }
}

const createPlato = async (req, res) => {
    try {
        const {nombre, descripcion, precio, restaurante_id} = req.body;
    const result = await pool.query('INSERT INTO Platos (nombre, descripcion, precio, restaurante_id) VALUES ($1, $2, $3, $4) RETURNING *',
         [nombre, descripcion, precio, restaurante_id]);

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
    getPlatos,
    createPlato,
    deletePlato,
    updatePlato
}