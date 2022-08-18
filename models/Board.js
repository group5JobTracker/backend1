const { pool } = require('../db');

class Board {
    static async create(name, owner, color) {
        const sql = `INSERT INTO boards ("name", "owner", "card_color_hex")
        VALUES ($1, $2, $3) returning *;`
        const databaseResult = await pool.query(sql, [name, owner, color]);
        return databaseResult.rows[0];
    }
}

module.exports = Board;