const { pool } = require('../db');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils');
const User = require('../models/User');

async function signUpUser(req, res) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const industry = req.body.industry

    try {
        const result = await User.create(firstName, lastName, email, password, industry)
        const userToken = generateToken(result.user_id)
        res.status(201).json({
            newUser: result,
            token: userToken
        })
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const sql = `SELECT * from users where email = $1`
        const databaseResult = await pool.query(sql, [email])
        if (!databaseResult.rows[0]) {
            return res.status(401).json({
                message: "You sure you have the right email?",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, databaseResult.rows[0].password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "You sure you have the right password?",
            });
        }

        const token = generateToken();

        return res.status(200).json({
            userInfo: databaseResult.rows[0],
            token
        })

    } catch (err) {
        res.status(500).json({
            message: `${err.message}`
        })
    }
}
module.exports = {
    signUpUser,
    login
}