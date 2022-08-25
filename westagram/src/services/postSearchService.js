const postDao = require('../models/postDao');
const userDao = require('../models/userDao');

const searchPosts = async () => {
    return await postDao.searchPosts();
}

const searchUserPost = async (userId) => {
    const checkResult = await userDao.userCheck(userId);
    
    if (Number(checkResult.result) !== 1) {
        const err = new Error('USER_IS_NOT_EXISTED');
        err.statusCode = 400;
        throw err;
    }

    const userPostResult = await postDao.searchUserPost(userId);
    return userPostResult;
}

module.exports = {
    searchPosts,
    searchUserPost
}