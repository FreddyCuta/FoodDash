const pool = require('../database/database');

// --- PÚBLICO ---
const getTodosRestaurantes = async (req, res) => {
    const restaurantes = await pool.query('SELECT * FROM Restaurantes');
    res.json( restaurantes.rows );
};

const getPlatosYTop = async (req, res) => {
    const { id } = req.params;
    try {
        // Busqueda de platos por restaurante
        const platos = await pool.query('SELECT * FROM Platos WHERE restaurante_id = $1', [id]);
        
        // Obtener los top platos por restaurante
        const top = await pool.query(`
            SELECT 
                p.id,
                p.nombre,
                p.precio,
                p.restaurante_id,
                p.calificacion,
                COALESCE(SUM(dp.cantidad), 0) as total_vendido
            FROM Platos p
            LEFT JOIN Detalle_Pedidos dp ON p.id = dp.plato_id
            WHERE p.restaurante_id = $1
            GROUP BY p.id, p.nombre, p.precio, p.restaurante_id, p.calificacion
            ORDER BY total_vendido DESC
            LIMIT 5
            `, [id]);
        
        // Obtener los datos de restuarante
        const restauranteInfo = await pool.query('SELECT * FROM Restaurantes WHERE id = $1', [id]);

        // 4. Devolvemos TODO
        res.json({ 
            platos: platos.rows, 
            topplatos: top.rows,
            restaurante: restauranteInfo.rows[0] // Datos: Platos, Top_platos, Restaurantes
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// --- PÚBLICO: SOPORTE PARA INVITADOS ---
// En tu controlador de pedidos
const createPedido = async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            usuario_id,
            restaurante_id,
            nombre_cliente,
            correo_cliente,
            telefono_cliente,
            direccion_envio,
            notas,
            items
        } = req.body;

        // --- Validaciones iniciales ---
        if (!restaurante_id) 
            return res.status(400).json({ error: "restaurante_id es obligatorio" });

        if (!items || !Array.isArray(items) || items.length === 0) 
            return res.status(400).json({ error: "El pedido debe contener al menos un item" });

        // Validar cada item y calcular total automáticamente
        let totalCalculado = 0;
        for (const [index, item] of items.entries()) {
            if (!item.plato_id) 
                return res.status(400).json({ error: `El item en la posición ${index} no tiene plato_id` });
            if (!item.cantidad || item.cantidad <= 0) 
                return res.status(400).json({ error: `El item en la posición ${index} tiene cantidad inválida` });
            if (!item.precio_unitario || item.precio_unitario < 0) 
                return res.status(400).json({ error: `El item en la posición ${index} tiene precio_unitario inválido` });

            totalCalculado += item.cantidad * item.precio_unitario;
        }

        await client.query("BEGIN");

        // Insertar pedido
        const pedidoResult = await client.query(
            `
            INSERT INTO pedidos
            (usuario_id, restaurante_id, total, estado, fecha_reserva,
             direccion_envio, notas, nombre_cliente, correo_cliente, telefono_cliente)
            VALUES ($1,$2,$3,'pendiente', NOW(), $4,$5,$6,$7,$8)
            RETURNING id
            `,
            [
                usuario_id || null,
                restaurante_id,
                totalCalculado,
                direccion_envio || null,
                notas || null,
                nombre_cliente || null,
                correo_cliente || null,
                telefono_cliente || null
            ]
        );

        const pedido_id = pedidoResult.rows[0].id;

        // Insertar detalles del pedido
        for (const item of items) {
            await client.query(
                `INSERT INTO detalle_pedidos
                 (pedido_id, plato_id, cantidad, precio_unitario)
                 VALUES ($1,$2,$3,$4)`,
                [pedido_id, item.plato_id, item.cantidad, item.precio_unitario]
            );
        }

        await client.query("COMMIT");

        res.status(201).json({
            message: "Pedido creado correctamente",
            pedido_id,
            total: totalCalculado
        });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        res.status(500).json({ error: "Error al crear pedido", detalle: error.message });
    } finally {
        client.release();
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