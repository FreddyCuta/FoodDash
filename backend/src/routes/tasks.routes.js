const {Router} = require('express');

const { getTodosRestaurantes, getPlatos, createPlato, deletePlato, updatePlato } = require('../controllers/tasks.controller');

const pool = require('../databes');


const router = Router();

router.get('/restaurantes', getTodosRestaurantes);

router.get('/restaurantes/:id/platos',getPlatos)

router.post('/restaurantes/:id/platos',createPlato)

router.delete('/restaurantes/:id/platos/:plato_id',deletePlato)

router.put('/restaurantes/:id/platos/:plato_id',updatePlato)

module.exports = router;