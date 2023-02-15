const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../model/http-error');
const UserSchema = require('../model/UsersSchema');

const getUsers = async (req, res, next) => {
    let getUsers;
    try {
        getUsers = await UserSchema.find()
    } catch (err) {
        const error = new HttpError("Can't get users", 500)
        return next(error)
    }

    res.send(getUsers);

};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await UserSchema.findOne({ email: email})
        if (!existingUser) {
            return next(new HttpError('Invalid email or password', 400))
        }
    } catch (error) {
        return next(new HttpError("Something went wrong, can't login", 500))
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) {
            return next(new HttpError('Invalid email or password', 400))
        }
    
    } catch (error) {
        return next(new HttpError("Something went wrong, can't login", 500))
    }
    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id }, 
            process.env.PRIVATE_KEY, 
            { expiresIn: '2h' }
            )
    } catch (error) {
        return next(new HttpError("Something went wrong, can't login", 500))
    }

    res.status(201).send({userId: existingUser.id, token: token});
};

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (error) {
        return next(new HttpError('Could not create user, please try again'))
    }

    const newUser = new UserSchema(
        {
            name,
            email,
            password: hashedPassword,
            places: []
        }
    )

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.errors[ 0 ].msg)
    }

    if (confirmPassword !== password) {
        return next(new HttpError('Password did not matched', 400))
    }


    try {
        const existingUser = await UserSchema.findOne({ email: email })

        if (existingUser) {
            return next(new HttpError('Email already exist', 422));
        }

        await newUser.save()
    } catch (err) {
        const error = new HttpError("Something went wrong, can't signup")
        return next(error)
    }


    res.status(201).send({ message: "Account created succesfully" });
};



module.exports = {
    getUsers,
    login,
    signup
}