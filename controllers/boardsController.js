const Board = require('../models/Board');
async function createBoard(req, res) {
    const { name, owner, color } = req.body;

    try {
        const response = await Board.create(name, owner, color)
        res.status(201).json({ board: response })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` })
    }
}

module.exports = {
    createBoard
}