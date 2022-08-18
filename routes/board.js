const router = require('express').Router();
const boardController = require('../controllers/boardsController');

router.get('/user/:userId', boardController.userBoards);

router.post('/create', boardController.createBoard);

router.patch('/edit/:boardId/:column', boardController.editBoard)

router.delete('/:id', boardController.deleteBoard)

module.exports = router;