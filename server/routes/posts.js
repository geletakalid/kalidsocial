import express from 'express';
const router = express.Router();
import { createPost,getPosts,deletePost,updatePost,likePost } from '../controller/posts.js';
import auth from '../middleware/auth.js';
import { signup } from '../controller/user.js';
router.get('/', getPosts);
router.post('/',auth, createPost);
router.delete('/:id',auth, deletePost);
router.patch('/:id',auth, updatePost);
router.patch('/:id/likePost',auth, likePost);


export default router;