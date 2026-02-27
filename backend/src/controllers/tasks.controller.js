const pool = require('../database/database');

// --- PÚBLICO ---
const getTodosRestaurantes = async (req, res) => {
    const result = await pool.query('SELECT * FROM Restaurantes');
    res.json(result.rows);
};

const getPlatosYTop = async (req, res) => {
    const { id } = req.params; // Este ID es el número (1, 2, 3)
    try {
        // 1. Buscamos los platos
        const platos = await pool.query('SELECT * FROM Platos WHERE restaurante_id = $1', [id]);
        
        // 2. Buscamos el TOP
        const top = await pool.query(`
            SELECT p.*, SUM(dp.cantidad) as total_vendido FROM Platos p 
            LEFT JOIN Detalle_Pedidos dp ON p.id = dp.plato_id 
            WHERE p.restaurante_id = $1 GROUP BY p.id ORDER BY total_vendido DESC LIMIT 5`, [id]);
        
        // 3. AGREGAMOS ESTO: Buscamos la info del restaurante
        const restauranteInfo = await pool.query('SELECT * FROM Restaurantes WHERE id = $1', [id]);

        // 4. Devolvemos TODO
        res.json({ 
            platos: platos.rows, 
            topplatos: top.rows,
            restaurante: restauranteInfo.rows[0] // Enviamos el objeto con nombre, imagen, etc.
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// --- PÚBLICO: SOPORTE PARA INVITADOS ---
// En tu controlador de pedidos
const createPedido = async (req, res) => {
    const { 
        usuario_id, restaurante_id, total, 
        nombre_cliente, correo_cliente, telefono_cliente, 
        direccion_envio, notas, items 
    } = req.body;

    try {
        await pool.query('BEGIN');

        // Insertamos la cabecera del pedido incluyendo los datos de contacto del invitado
        const result = await pool.query(
            `INSERT INTO Pedidos (
                usuario_id, restaurante_id, total, 
                nombre_cliente, correo_cliente, telefono_cliente, 
                direccion_envio, notas
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [usuario_id, restaurante_id, total, nombre_cliente, correo_cliente, telefono_cliente, direccion_envio, notas]
        );

        const pedidoId = result.rows[0].id;

        // Insertar los platos en el detalle
        for (const item of items) {
            await pool.query(
                `INSERT INTO Detalle_Pedidos (pedido_id, plato_id, cantidad, precio_unitario) 
                 VALUES ($1, $2, $3, $4)`,
                [pedidoId, item.id_plato, item.cantidad, item.precio]
            );
        }

        await pool.query('COMMIT');
        res.status(200).json({ message: "Pedido procesado" });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: "Error al guardar el pedido" });
    }
};

// --- ADMIN ---
const getInfoRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        const [ingresos, unidades, topPlatos] = await Promise.all([
            pool.query('SELECT COALESCE(SUM(total), 0) as total FROM Pedidos WHERE restaurante_id = $1', [id]),
            pool.query('SELECT COALESCE(SUM(dp.cantidad), 0) as total FROM Detalle_Pedidos dp JOIN Pedidos p ON dp.pedido_id=p.id WHERE p.restaurante_id=$1', [id]),
            pool.query(`
                SELECT p.nombre, SUM(dp.cantidad) as total_vendido, p.precio
                FROM Platos p
                JOIN Detalle_Pedidos dp ON p.id = dp.plato_id
                WHERE p.restaurante_id = $1
                GROUP BY p.id
                ORDER BY total_vendido DESC LIMIT 5`, [id])
        ]);

        res.json({ 
            ingresos: { ingresos_generados: parseFloat(ingresos.rows[0].total) }, 
            unidadesVendidas: { unidades_vendidas: parseInt(unidades.rows[0].total) },
            best5Platos: topPlatos.rows,
            bestRentablePlato: [topPlatos.rows[0]] // El #1 en ventas suele ser el más rentable
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



const createPlato = async (req, res) => {
    const { nombre, descripcion, precio, restaurante_id, calificacion } = req.body;
    const result = await pool.query(
        'INSERT INTO Platos (nombre, descripcion, precio, restaurante_id, calificacion) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [nombre, descripcion, precio, restaurante_id, calificacion || 5.0]);
    res.json(result.rows[0]);
};

const deletePlato = async (req, res) => {
    await pool.query('DELETE FROM Platos WHERE id = $1', [req.params.id]);
    res.sendStatus(204);
};

const updatePlato = async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const result = await pool.query(
        'UPDATE Platos SET nombre=$1, precio=$2, descripcion=$3 WHERE id=$4 RETURNING *',
        [nombre, precio, descripcion, req.params.id]);
    res.json(result.rows[0]);
};

module.exports = { getTodosRestaurantes, getPlatosYTop, createPlato, deletePlato, updatePlato, createPedido, getInfoRestaurante };