import axios from 'axios'

// create axios instance
const API = axios.create({ baseURL: 'https://memories-project-corm.herokuapp.com'})

// add bearer token for a specific profile to each token in the request
// This allows backend to get a specific header and based on that header we can decode data so our backend knows 
//...if a sepcific user is logged in. Same as decode data we did in Middleware
API.interceptors.request.use((req) => {
	if(localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
	}
	return req;
});


// const fetchPost is equal to an arrow function which is an axios.get call to our url
// here we define the API calls we make to the backend to the baseURL above
// these API calls are mirror images of the routes in "routes/posts.js" and "routes/users.js"
// dynamic values like { id } below is sent to our routes and then our controllers in req.params
// dynamic { value } is the contents of a comment
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);