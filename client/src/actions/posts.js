import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

// make use of the index.js file in the api folder
// import * means we import everything from the actions as API. Allowing us to use API calls by "api.fetchPosts()" as below
import * as api from '../api/index.js'

export const getPost = (id) => async (dispatch) => {
	try {
	  dispatch({ type: START_LOADING });
  
	  const { data } = await api.fetchPost(id);
  
	  dispatch({ type: FETCH_POST, payload: { post: data } });

	} catch (error) {
	  console.log(error);
	}
  };

// Redux-thunk used for async actions
// Action Creators are functions that return actions, such as const "getPosts"
// Action is just an object with "action type" and payload; which we dispatch below
// redux thunk allows us create a function which uses another function; two arrow functions on next line
// action is dipatched from app.js
// { data } below is the destructured response which represents the posts
export const getPosts = (page) => async (dispatch) => {
    try {
		dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message)
    }
};

// "const { data: { data } }" we destructure the data twice, firsty because we are making an axios request and
//...secondly to put it into a new object where it has the "data" property
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
	 dispatch({ type: START_LOADING });
	  const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
  
	  console.log("getPostsBySearch: " + data)

	 dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
	 dispatch({ type: END_LOADING });
	} catch (error) {
	  console.log(error);
	}
  };

export const createPost = (post, history) => async (dispatch) => {
try {
	dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

	dispatch({ type: CREATE, payload: data });

	console.log("createpost: " + data);

	history.push(`/posts/${data._id}`);

	} catch (error) {
    console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {

	try {
		const { data } = await api.updatePost(id, post);
	
		dispatch({ type: UPDATE, payload: data });
		} catch (error) {
		console.log(error.message);
		}
	};

	export const likePost = (id) => async (dispatch) => {
		const user = JSON.parse(localStorage.getItem('profile'));

		try {
		  const { data } = await api.likePost(id, user?.token);
	  
		  dispatch({ type: LIKE, payload: data });
		} catch (error) {
		  console.log(error.message);
		}
	  };

	export const commentPost = (value, id) => async (dispatch) => {
		try {
		  const { data } = await api.comment(value, id);
	  
		  dispatch({ type: COMMENT, payload: data });
		
		  console.log("commentPost: " + data)
		  // contains response from API call with array holding all comments against the post, including that which just added
		  return data.comments;
		} catch (error) {
		  console.log(error);
		}
	  };
	  
	  export const deletePost = (id) => async (dispatch) => {
		try {
		  await api.deletePost(id);
	  
		  dispatch({ type: DELETE, payload: id });
		} catch (error) {
		  console.log(error.message);
		}
	  };