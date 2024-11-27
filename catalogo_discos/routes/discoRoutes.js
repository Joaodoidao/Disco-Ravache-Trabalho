const express = require('express');
const router = express.Router();
const discoController = require('../controllers/discoController');

router.get('/', discoController.listarDiscos);
router.post('/novo', discoController.adicionarDisco);
router.get('/remover/:id', discoController.removerDisco);

module.exports = router;
