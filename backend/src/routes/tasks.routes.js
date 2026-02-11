const {Router} = require('express');

const { getTodosRestaurantes, getPlatosYTop, createPlato, deletePlato, updatePlato, createPedido } = require('../controllers/tasks.controller');

const pool = require('../databes');


const router = Router();

router.get('/restaurantes', getTodosRestaurantes);

router.get('/restaurantes/:id/platos',getPlatosYTop)

router.post('/restaurantes/:id/platos',createPlato)

router.delete('/restaurantes/:id/platos/:plato_id',deletePlato)

router.put('/restaurantes/:id/platos/:plato_id',updatePlato)

router.post('/pedidos', createPedido)


module.exports = router;