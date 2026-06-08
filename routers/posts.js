import express from 'express';
import {index, show, create, destroy, modify} from '../controllers/posts.js';
import findSlug from '../middlewares/findSlug.js';
import obliterateBySlug from '../middlewares/obliterateBySlug.js';
import createNewPost from '../middlewares/createNewPost.js';
import modifyPost from '../middlewares/modifyPost.js';
import notFound from '../middlewares/notFound.js';

const router = express.Router();

// INDEX hhtp://localhost:5555/posts
router.get('/', index)

// SHOW hhtp://localhost:5555/posts/ciambellone
router.get('/:id', show);

// CREATE
router.post('/', createNewPost, create)

// PATCH
router.patch('/:id', modify)

// DELETE
router.delete('/:id', destroy)


export default router


