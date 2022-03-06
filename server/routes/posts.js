// This file contains all the code to do with posts in the app
import express from 'express'

// these imported controller functions handle the logic for completing the action, e.g: likePost has the logic for liking a post
import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, commentPost, likePost } from '../controllers/posts.js'

import auth from '../middleware/auth.js';
const router = express.Router();

// Because this file begins with "posts", all the routes below begin with "posts" even though we can't see it e.g: '/' is 'posts/'
//               -> in api/index.js the endpoint specifies posts e.g: export "const fetchPost = (id) => API.get(`/posts/${id}`);"
// api requests in api/index.js mirror our routes
// Once someone visits localhost:5000/ the callback function will be run
// Two parameters in each route below - the address for the request and a callback function i.e: getPosts, createPost, etc
// These callback functions are imported from controllers
// patch is used for updating existing documents
// some routes we need to call auth before the controllers
// having auth in the route means a user needs to be logged in to do the action
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

// We have to export that router to index.js
export default router