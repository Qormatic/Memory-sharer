import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

// Basically reducers are functions which manage state in an application. 
// For instance, if a user writes something in an HTML input field, the application has to manage this UI state
// In essence, a reducer is a function which takes two arguments -- the current state and an action
// Based on both arguments it returns a new state

export default combineReducers({ posts, auth })