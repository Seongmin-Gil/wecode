const postDao = require('../models/postDao');
const userDao = require('../models/userDao');

const createPost = async (title, content, email) => {
    const userId = await userDao.findUserId(email);
    
    const userIdData = userId.id;

    const insertPost = await postDao.insertPost(
        title,
        content,
        userIdData
    );

    return insertPost;
};

const patchPost = async (postId, postingTitle, postingContent) => {
    const postCheckResult = await postDao.postCheck(postId);
    
    if (Number(postCheckResult.result) !== 1) {
        const err = new Error('POSTING_IS_NOT_EXISTED');
        err.statusCode = 400;
        throw err;
    }

    const userPostResult = await postDao.patchPost(
        postId,
        postingTitle,
        postingContent
        );
        
    return userPostResult;
}

const deletePost = async(postId) => {
    await postDao.deletePost(postId);
}

module.exports = {
    createPost,
    patchPost,
    deletePost
}