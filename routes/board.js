const router = require('express').Router();
const boardController = require('../controllers/boardsController');

router.get('/user/:userId', boardController.userBoards);

router.get('/:boardId/cards', boardController.getCards);

router.post('/create', boardController.createBoard);

router.post('/addCard/:boardId', boardController.addToBoard)

router.patch('/edit/:boardId/:column', boardController.editBoard)

router.delete('/:id', boardController.deleteBoard)

router.delete('/:boardId/removeCard/:appId', boardController.removeCard)

module.exports = router;