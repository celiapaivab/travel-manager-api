const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { authenticateToken } = require('../service/auth');

router.post('/', authenticateToken, destinationController.create);
router.get('/', authenticateToken, destinationController.list);
router.get('/:id', authenticateToken, destinationController.get);
router.put('/:id', authenticateToken, destinationController.update);
router.delete('/:id', authenticateToken, destinationController.remove);

module.exports = router;
