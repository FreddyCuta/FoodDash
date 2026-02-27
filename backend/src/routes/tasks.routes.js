const { Router } = require('express');
const router = Router();
const { 
    getTodosRestaurantes, 
    getPlatosYTop, 
    createPlato, 
    deletePlato, 
    updatePlato, 
    createPedido, 
    getInfoRestaurante 
} = require('../controllers/tasks.controller');

// Públicas
router.get('/restaurantes', getTodosRestaurantes);
router.get('/restaurantes/:id/platos', getPlatosYTop);
router.post('/pedidos', createPedido);

// Admin (Simplificadas)
router.get('/restaurantes/:id/infoRestaurante', getInfoRestaurante);
router.post('/platos', createPlato); 
router.delete('/platos/:id', deletePlato);
router.put('/platos/:id', updatePlato);

module.exports = router;