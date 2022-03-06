import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
// "useDispatch" is a hook which allows us to to dispatch an action; we use "useDispatch" inside "useEffect"
import { useDispatch } from 'react-redux';
// useLocation tells us which page we are currently on
import { useHistory, useLocation } from 'react-router-dom';
// ChipInput is great for searching tags
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

// use useQuery as a hook
function useQuery() {
	return new URLSearchParams(useLocation().search);
  }

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
// const page is going to read our URL sand see if theres a page parameter; if no page parameter than it returns 1
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  // set current state of id at the start to null
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

// array can't be passed through url so we need to add ',' between tags
// "||" means "or" -> we will search titles and/or tags
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

// Keycode 13 is the enter key
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

// setTags is the state variable used in the frontend; tags is the state array where we store tags
// here we spread the previous tags and add the new tag(s)
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

// grow is for indentation
// we import posts and Form components and put in our container below
// posts contains multiple post components
// Home component handles pagination logic
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
		  <AppBar className={classes.appBarSearch} position="static" color="inherit">
			  <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Titles" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
			  <ChipInput 
			   style={{ margin: '10px 0' }}
			   value={tags}
			   onAdd={(chip) => handleAddChip(chip)}
			   onDelete={(chip) => handleDeleteChip(chip)} 
			   label="Search Tags" 
			   variant="outlined" 
			   />
			<Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
		  </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
			{(!searchQuery && !tags.length) && (
			<Paper className={classes.pagination} elevation={6} >
				<Pagination page={page} />
			</Paper>
			)}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;