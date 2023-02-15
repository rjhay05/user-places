const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { getUsers, login, signup } = require('../controller/usersController');

router.get('/', getUsers)

router.post('/login', login)

router.post('/signup',
    [
        check('name')
            .isLength({ min: 5 })
            .withMessage('Name must be 5 characters long'),
        check('email')
            .isEmail().normalizeEmail()
            .withMessage('Please enter a valid email'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be 6 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
    ],
    signup)

module.exports = router;