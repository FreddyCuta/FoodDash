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
    const platos = await pool.query('SELECT  P.ID AS ID_PLATO, P.NOMBRE, P.DESCRIPCION, P.PRECIO, P.CALIFICACION, R.NOMBRE AS RESTAURANTE,SUM(PE.CANTIDAD) AS TOTAL_VENDIDO FROM PLATOS P JOIN PEDIDOS PE ON PE.PLATO_ID = P.ID JOIN RESTAURANTES R ON R.ID = P.RESTAURANTE_ID WHERE R.ID = $1 GROUP BY P.ID,R.NOMBRE', [id])
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

const getInfoRestaurante = async(req,res)=>{
    const {id} = req.params;
    try {
        const ingresos = await pool.query('SELECT r.id AS restaurante_id, r.nombre AS restaurante, SUM(pe.cantidad*pl.precio) AS ingresos_totales FROM pedidos pe JOIN platos pl ON pe.plato_id=pl.id JOIN restaurantes r ON r.id=pl.restaurante_id GROUP BY r.id,r.nombre ORDER BY ingresos_totales DESC');

        const best5Platos = await pool.query('SELECT P.NOMBRE, P.CALIFICACION, SUM(PE.CANTIDAD) AS TOTAL_VENDIDO, P.PRECIO FROM PEDIDOS PE JOIN PLATOS P ON PE.PLATO_ID = P.ID JOIN RESTAURANTES R ON R.ID = P.RESTAURANTE_ID WHERE R.ID = $1 GROUP BY P.NOMBRE, P.CALIFICACION, P.PRECIO ORDER BY TOTAL_VENDIDO DESC LIMIT 5', [id]);

        const worst5Platos = await pool.query('SELECT P.NOMBRE, P.CALIFICACION, SUM(PE.CANTIDAD) AS TOTAL_VENDIDO, P.PRECIO FROM PEDIDOS PE JOIN PLATOS P ON PE.PLATO_ID = P.ID JOIN RESTAURANTES R ON R.ID = P.RESTAURANTE_ID WHERE R.ID = $1 GROUP BY P.NOMBRE, P.CALIFICACION, P.PRECIO ORDER BY TOTAL_VENDIDO ASC LIMIT 5', [id]);
        
        const unidadesVendidas = await pool.query('SELECT SUM(pe.cantidad) AS unidades_vendidas FROM Pedidos pe JOIN Platos pl ON pe.plato_id = pl.id WHERE pl.restaurante_id = $1',[id]);

        const bestRentablePlato = await pool.query('SELECT p.id AS plato_id,p.nombre,SUM(pe.total) AS ingresos_generados FROM Platos p JOIN Pedidos pe ON pe.plato_id = p.id WHERE p.restaurante_id = 1 GROUP BY p.id ORDER BY ingresos_generados DESC LIMIT 1;')
        
        const worstRentablePlato = await pool.query('SELECT p.id AS plato_id,p.nombre,SUM(pe.total) AS ingresos_generados FROM Platos p JOIN Pedidos pe ON pe.plato_id = p.id WHERE p.restaurante_id = 1 GROUP BY p.id ORDER BY ingresos_generados ASC LIMIT 1;')
        
        res.json({
        ingresos: ingresos.rows,
        best5Platos: best5Platos.rows,
        worst5Platos :worst5Platos.rows,
        unidadesVendidas : unidadesVendidas.rows,
        bestRentablePlato : bestRentablePlato.rows,
        worstRentablePlato : worstRentablePlato.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener datos" });
    }
}

const createPedido = async (req, res) => {
    try {
    const {nombre_cliente, correo_cliente, telefono_cliente, plato_id, cantidad, total} = req.body;
    const result = await pool.query('INSERT INTO Pedidos (nombre_cliente, correo_cliente, telefono_cliente, plato_id, cantidad, total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
         [nombre_cliente, correo_cliente, telefono_cliente, plato_id, cantidad, total]);
         res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el pedido'
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
    updatePlato,
    createPedido,
    getInfoRestaurante
}