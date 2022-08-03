const { Pool } = require('pg')

const connection = {
    database: "job_application_tracker",
    user: 'markrrr',
    password: '12'
}

const connectionProduction = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connection)

module.exports = {
    pool
}