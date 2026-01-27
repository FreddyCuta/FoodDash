const {Router} = require('express');

const { getTodosRestaurantes, getRestaurante, createPlato, deletePlato, updatePlato } = require('../controllers/tasks.controller');

const pool = require('../databes');


const router = Router();

router.get('/tasks', getTodosRestaurantes);

router.get('/tasks/10',getRestaurante)

router.post('/tasks',createPlato)

router.delete('/tasks',deletePlato)

router.put('/tasks',updatePlato)

module.exports = router;