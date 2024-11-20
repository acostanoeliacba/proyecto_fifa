
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');
const { verifyToken } = require('../controllers/player.controller');

router.get('/', verifyToken, playerController.getAllPlayers);
router.get('/:id', verifyToken, playerController.getPlayerById);
router.post('/', verifyToken, playerController.createPlayer);
router.put('/:id', verifyToken, playerController.updatePlayer);
router.delete('/:id', verifyToken, playerController.deletePlayer);
router.get('/filter', verifyToken, playerController.filterPlayers);

module.exports = router;
