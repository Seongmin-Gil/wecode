const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verify = require('../util/verify');
const userDao = require('../models/userDao');

const secretKey = process.env.PRIVATEKEY;
const saltRounds = 12;

const signUp = async (name, email, profileImage, password) => {
    await verify.verifiedSignUp(email, password);

    const bcryptPassword = await bcrypt.hash(password, saltRounds);

    const createUser = await userDao.createUser(
        name,
        email,
        bcryptPassword,
        profileImage
    );

    return createUser;
};

const search = async () => {
    const searchUser = await userDao.search();

    return searchUser;
}

const login = async (email, password) => {
    await verify.bcryptCheck(email, password);

    const userId = await userDao.findUserId(email);

    const payLoad = { userId, email };

    const token = jwt.sign(payLoad, secretKey);
    
    return token;
}

module.exports = {
    signUp,
    search,
    login
}