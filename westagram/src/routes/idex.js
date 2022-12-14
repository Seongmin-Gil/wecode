const express = require('express');
const router = express.Router();

const userRouter = require('./userRoute');
const postRouter = require('./postRoute');
const likeRoute = require('./likeRoute');

router.use('/users', userRouter.router);

router.use('/posts', postRouter.router);

router.use('/like', likeRoute.router);

module.exports = router;