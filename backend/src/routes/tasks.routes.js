const {Router} = require('express');

const { getTodosRestaurantes, getPlatos, createPlato, deletePlato, updatePlato } = require('../controllers/tasks.controller');

const pool = require('../databes');


const router = Router();

router.get('/tasks', getTodosRestaurantes);

router.get('/tasks/:id',getPlatos)

router.post('/tasks',createPlato)

router.delete('/tasks/:id',deletePlato)

router.put('/tasks/:id',updatePlato)

module.exports = router;