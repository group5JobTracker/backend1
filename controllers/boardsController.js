const Board = require('../models/Board');

const userBoards = async(req, res) => {
    const userId = req.params.userId;
    try {
        const response = await Board.searchBoards(userId);
        res.status(201).json({ boards: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

async function createBoard(req, res) {
    const { name, owner, color } = req.body;

    try {
        const response = await Board.create(name, owner, color)
        res.status(201).json({ board: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

const editBoard = async(req, res) => {
    const { boardId, column } = req.params;
    const newValue = req.body.newValue;

    try {
        const response = await Board.edit(boardId, column, newValue)
        res.status(201).json({ board: response });
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

const deleteBoard = async(req, res) => {
    const boardId = req.params.id;

    try {
        const response = await Board.delete(boardId);
        res.status(203).json({ message: `Board with name ${response[0].name} has been successfully deleted` })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

module.exports = {
    createBoard,
    editBoard,
    deleteBoard,
    userBoards
}