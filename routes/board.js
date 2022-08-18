const router = require('express').Router();
const board = require('../controllers/boardsController');

router.post('/create', board.createBoard);

module.exports = router;