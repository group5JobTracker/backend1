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

    static async cards(boardId) {
        const sql = `SELECT applications.app_id, applications.status, applications."position" ,applications.company, applications."location", applications.recruiter_email, applications.created_at, applications.notes, applications.reminders_on, applications.card_color_hex, applications.job_description
        FROM applications
        JOIN applications_join_boards
        on applications_join_boards.app = applications.app_id
        WHERE applications_join_boards.board = $1
        GROUP BY 
        1,2,3,4,5,6,7,8,9,10,11;
        `
        const databaseResult = await pool.query(sql, [boardId])
        return databaseResult.rows
    }

    static async add(appId, boardId) {
        const sql = `INSERT INTO applications_join_boards ("app","board")
        VALUES ($1, $2) returning *`;
        const databaseResult = await pool.query(sql, [appId, boardId]);
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

    static async removeCard(boardId, appId) {
        const sql = `DELETE FROM applications_join_boards WHERE board = $1 and app = $2 returning*;`
        const databaseResult = await pool.query(sql, [boardId, appId])
        return databaseResult.rows;
    }
}

module.exports = Board;