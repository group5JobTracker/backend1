const { pool } = require('../db');

class Board {
    static async searchBoards(userId) {
        const sql = `SELECT * FROM boards where "owner" = $1;`
        const databaseResult = await pool.query(sql, [userId])
        return databaseResult.rows
    }

    static async create(name, owner, color) {
        const sql = `INSERT INTO boards ("name", "owner", "card_color_hex")
        VALUES ($1, $2, $3) returning *;`
        const databaseResult = await pool.query(sql, [name, owner, color]);
        return databaseResult.rows[0];
    }

    static async edit(boardId, column, newValue) {
        const sql = `UPDATE boards SET ${column} = $1
        WHERE board_id = $2 returning *;`
        const databaseResult = await pool.query(sql, [newValue, boardId])
        return databaseResult.rows[0]
    }

    static async delete(id) {
        const sql = `DELETE from boards WHERE board_id = $1 returning *;`
        const databaseResult = await pool.query(sql, [id])
        return databaseResult.rows;
    }
}

module.exports = Board;