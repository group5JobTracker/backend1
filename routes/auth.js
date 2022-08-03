const router = require('express').Router();
const { pool } = require('../db');
const auth = require('../controllers/authController');

router.post('/signup', auth.signUpUser);

router.post('/login', auth.login)

module.exports = router;