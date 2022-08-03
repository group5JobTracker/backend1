const { response } = require('express');
const { pool } = require('../db');

class Application {
    static async create(user, status, title, company, location, contact, date, notes, notif, color) {
        const sql = `INSERT INTO applications ("user", "status", "position", "company", "location", "recruiter_email", "created_at", "notes", "reminders_on", "card_color_hex") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *;`
        const databaseResult = await pool.query(sql, [user, status, title, company, location, contact, date, notes, notif, color]);
        return databaseResult.rows[0];
    }

    static async search(user) {
        const sql = `SELECT * FROM applications where "user" = $1;`
        const databaseResult = await pool.query(sql, [user])
        return databaseResult.rows
    }

    static async searchApps(appId) {
        const sql = `SELECT * FROM applications where "app_id" = $1;`
        const databaseResult = await pool.query(sql, [appId])
        return databaseResult.rows[0]
    }

    static async delete(appId) {
        const sql = `DELETE from applications WHERE app_id = $1;`
        const databaseResult = await pool.query(sql, [appId])
        return databaseResult.rows;
    }

    static async edit(category, value, appId) {
        const sql = `UPDATE applications
        SET $1 = $2
        WHERE app_id = $3 returning *;`
        const databaseResult = await pool.query(sql, [category, value, appId])
        return databaseResult.rows[0];
    }
}

module.exports = Application;