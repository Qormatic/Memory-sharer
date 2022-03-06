import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
// useSelector used to fetch data from the global redux store; initiated as a hook
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

// destructure posts as it contains isLoading and numberOf Pages; not just an array of posts
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if(!posts.length && !isLoading) return 'No Posts';

  return (
	  // If post.length is 0 return <CircularProgress />; else return the <Grid />, e.g the posts
	  // 12 is a full row so for "xs={12}" this is one card per row "lg={3}" is four per row
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;