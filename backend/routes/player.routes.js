
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.get('/', playerController.verifyToken, playerController.getAllPlayers);
router.get('/:id', playerController.verifyToken, playerController.getPlayerById);
router.post('/', playerController.verifyToken, playerController.createPlayer);
router.put('/:id', playerController.verifyToken, playerController.updatePlayer);
router.delete('/:id', playerController.verifyToken, playerController.deletePlayer);

module.exports = router;
