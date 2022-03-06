// create constants for our action types as it's safer than using strings; avoids misspellings etc
// error messages will tell us if we haven't defined a variable which makes it easier to debug

export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const FETCH_ALL = 'FETCH_ALL';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_BY_SEARCH = 'FETCH_BY_SEARCH';
export const LIKE = 'LIKE';
export const COMMENT = 'COMMENT';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';