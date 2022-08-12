const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');

const verifiedSignUp = async (email, password) => {
    const pwValidation = new RegExp(
        `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@$^%&*])(?=.{8,20})`
    );

    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const emailCheck = await userDao.emailCheck(email);

    if (Number(emailCheck.result) === 1) {
        const err = new Error('USER_IS_EXISTED');
        err.statusCode = 409;
        throw err;
    }
}

const bcryptCheck = async (email, password) => {
    const bcryptPassword = await userDao.passwordCheck(email);

    const result = await bcrypt.compare(password, bcryptPassword.password);

    if (result !== true) {
        const err = new Error('INVALID_USER');
        err.statusCode = 401;
        throw err;
    }
}

const postingCheck = (title, content) => {
    if (!title || !content) {
        return res.status(400).json({ message: "KEY_ERROR" });
    }
}

module.exports = {
    verifiedSignUp,
    bcryptCheck,
    postingCheck
}