import express from 'express';
const router = express.Router();
import { createPost,getPosts,deletePost,updatePost,likePost,getPostsBySearch,getPost  ,commentPost} from '../controller/posts.js';
import auth from '../middleware/auth.js';
import { signup } from '../controller/user.js';
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id',getPost)
router.post('/',auth, createPost);
router.delete('/:id',auth, deletePost);
router.patch('/:id',auth, updatePost);

router.patch('/:id/likePost',auth, likePost);
router.post('/:id/comments',auth, commentPost);

export default router;