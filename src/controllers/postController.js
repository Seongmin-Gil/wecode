const postService = require('../services/postService');
const postSearchService = require('../services/postSearchService');
const verify = require('../util/verify');

const errorHandler = (err, res) => {
    return res.status(err.statusCode || 500).json({ message: err.message });
}

const createPost = async (req, res) => {
    try {
        const { title, content, decoded } = req.body;

        verify.postingCheck(title, content);

        await postService.createPost(title, content, decoded['email']);
        return res.status(201).json({ message: "CREAT_POST_SUCCESS" });
    } catch (err) {
        errorHandler(err, res);
    }
}

const searchPosts = async (req, res) => {
    try {
        const posts = await postSearchService.searchPosts();
        return res.status(200).json({ data: posts });
    } catch (err) {
        errorHandler(err, res);
    }
}

const searchUserPost = async (req, res) => {
    try {
        const userId = req.params.userId
        const post = await postSearchService.searchUserPost(userId);
        return res.status(200).json({ data: Object.values(post)[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

const patchPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content } = req.body;

        verify.postingCheck(title, content);

        const modifidPost = await postService.patchPost(postId, title, content);
        return res.status(200).json({ data: modifidPost });
    } catch (err) {
        errorHandler(err, res);
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        await postService.deletePost(postId);
        return res.status(204).json({ data: 'DELETED_DATA' });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    createPost,
    searchPosts,
    searchUserPost,
    patchPost,
    deletePost
}