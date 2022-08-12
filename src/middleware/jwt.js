const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const secretKey = process.env.PRIVATEKEY;

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, secretKey);

        const checkResult = await userDao.userCheck(decoded.userId.id);

        if (Number(checkResult.result) !== 1) {
            const err = new Error('INVALID_USERS');
            err.statusCode = 401;
            throw err;
        }
        
        req.body.decoded = decoded;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateToken
}