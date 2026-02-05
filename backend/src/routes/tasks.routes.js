const {Router} = require('express');

const { getTodosRestaurantes, getPlatos, createPlato, deletePlato, updatePlato } = require('../controllers/tasks.controller');

const pool = require('../databes');


const router = Router();

router.get('/restaurantes', getTodosRestaurantes);

router.get('/restaurantes/:id',getPlatos)

router.post('/platos',createPlato)

router.delete('/platos/:id',deletePlato)

router.put('/platos/:id',updatePlato)

module.exports = router;