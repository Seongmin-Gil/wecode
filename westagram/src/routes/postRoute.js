const express = require('express');
const postControllers = require('../controllers/postController');
const jwtCheck = require('../middleware/jwt');

const router = express.Router();

router.get('/', postControllers.searchPosts);

router.get('/:userId', jwtCheck.validateToken, postControllers.searchUserPost);

router.post('/', jwtCheck.validateToken, postControllers.createPost);

router.patch('/:postId',postControllers.patchPost);

router.delete('/:postId', postControllers.deletePost);

module.exports = {
    router
}