// all handlers for our routes in controllers - means we don't keep adding logic to "routes/posts.js" 
// which would make it difficult to manage and to navigate the requests
// we export logic and routes and import them into "routes/posts.js"
// run all functions here and keep routes separate

// Queries v Params
// Params are specific such as id of a post "/posts/123" where id: 123
// Queries use broader search terms such as themes "/posts?tag=France" to look for posts tagged with "France"

import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

// getPosts accepts request and response, destructure {page} from the request
// LIMIT is number of posts per page
export const getPosts = async (req, res) => { 
		const { page } = req.query; 

    try {
		const LIMIT = 8;
	// This gets the starting index of each page. 
	// Although "{ page }" is a number, when it's passed it becomes a string so we have to use Number on the string
		const startIndex = (Number(page) - 1) * LIMIT;
	// Total is so we know how many pages we have
		const total = await PostMessage.countDocuments({});
	
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
                
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total /LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// the "i" in this line "const title = new RegExp(searchQuery, "i")" means ignore upper/lower cases
// "$or" below searches for posts where title or tags match the query
// "$in" below searches for a tag in the tags array
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// need a frontend form and layout to create posts
export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

// id is filled from the route we set up "router.patch('/:id', updatePost)"
// when a request is made to "/posts/123" we immediately take that 123 as the id value
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
 
// check id is a valid mongoose object id   
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

// updatedPost is going to be sent by the FE, we catch it in req.body
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

// This line is what the function returns
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

// userId passed from middleware/auth.js in the req 
export const likePost = async (req, res) => {
    const { id } = req.params;

	if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

	const index = post.likes.findIndex((id) => id === String(req.userId))

	console.log("Likes creator: " + req.userId)


	if (index === -1) {
		// like the post, add userId to the likes array for a post
		post.likes.push(req.userId);
	} else {
		// dislike the post, return array of userId minus the current user
		post.likes = post.likes.filter((id) => id !== String(req.userId));


	}

	// second parameter below is an object containing the update to the post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

// accepts request and response, destructure id from the request
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

	// get post from DB
    const post = await PostMessage.findById(id);
	// add comments to that post
    post.comments.push(value);
	// update comments array for the post in DB with new comment
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
	// return the updatedPost so we can display whoel thing with new comment in the FE
    res.json(updatedPost);
};



export default router;