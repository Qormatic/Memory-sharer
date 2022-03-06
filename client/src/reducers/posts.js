// reducers are functions that accept "state" as the 1st parameter, which we define as an object "{ isLoading: true, posts: []}" 
//... and as a 2nd parameter the action to take, ("action" below) based on the state
// below switch parameter (action.type) is the key and cases are the types e.g: create type
// the state always needs to be equal to something to begin with
// we don't use reducers here, we export them to use in combinereducers (reducers/index.js)
// "action.payload" in 'FETCH_ALL' is all the posts; in 'UPDATE' it's the updated post

import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
		case START_LOADING:
			return {...state, isLoading: true };
		case END_LOADING:
			return {...state, isLoading: false };
		case FETCH_ALL:
			return {
			...state,
			posts: action.payload.data,
			currentPage: action.payload.currentPage,
			numberOfPages: action.payload.numberOfPages
		};
		case FETCH_BY_SEARCH:
			return {...state, posts: action.payload.data };
		case FETCH_POST:
			return {...state, post: action.payload.post };
		case LIKE:
			return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
			case COMMENT:
				return {
				  ...state,
				  posts: state.posts.map((post) => {
					if (post._id == +action.payload._id) {
					  return action.payload;
					}
					return post;
				  }),
				};
		case CREATE:
			// spread posts, add new post which is stored in action.payload
			return {...state, posts: [...state, action.payload]};
		case UPDATE:
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
		case DELETE:
			return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        default:
            return state;
    }
};