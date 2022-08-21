const { pool } = require('../db');
const bcrypt = require('bcrypt');

class User {
    static async create(firstName, lastName, email, password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = `INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) returning *;`
        const databaseResult = await pool.query(sql, [firstName, lastName, email, hashedPassword])

        return databaseResult.rows[0]
    }

}
module.exports = User;