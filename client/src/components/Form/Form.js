import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

// GET the current ID of the post we are on i.e: when user on frontend presses edit button we need to pass the id of the post
// to our form component
// e.preventdefault prevents refresh of browser when user submits
// "?." checks if something is true
const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' })
	const post = useSelector((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null);
    const dispatch = useDispatch();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();

    const clear = () => {
		setCurrentId(0);
		setPostData({ title: '', message: '', tags: [], selectedFile: '' })
    };

	// use useEffect to populate the values of the form. It accepts two params, callback function and dependency array
	useEffect(() => {
		if (!post?.title) clear();
		if (post) setPostData(post);
	  }, [post]);

	  const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (currentId === 0) {
		  dispatch(createPost({ ...postData, name: user?.result?.name }, history));
		  clear();
		} else {
		  dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
		  clear();
		}
	  };

	// if no current logged in user we display message
	// "?." syntax means if something is undefined dont throw error
	  if (!user?.result?.name) {
		return (
		  <Paper className={classes.paper}>
			<Typography variant="h6" align="center">
			  Please Sign In to create your own memories and like other's memories.
			</Typography>
		  </Paper>
		);
	  }

	  const handleAddChip = (tag) => {
		setPostData({ ...postData, tags: [...postData.tags, tag] });
	  };
	
	  const handleDeleteChip = (chipToDelete) => {
		setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
	  };
    
	// data is going to be stored in the state "postData"
	// paper is like a <div> with white background
	// ... below is "spread" syntax, which flexibly maps as many parameters as there are to the destination
    return (
		<Paper className={classes.paper} elevation={6}>
		  <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
			<Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
			<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
			<TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
			<div style={{ padding: '5px 0', width: '94%' }}>
			  <ChipInput
				name="tags"
				variant="outlined"
				label="Tags"
				fullWidth
				value={postData.tags}
				onAdd={(chip) => handleAddChip(chip)}
				onDelete={(chip) => handleDeleteChip(chip)}
			  />
			</div>
			<div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
			<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
			<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
		  </form>
	  	</Paper>
	  );
}

export default Form;