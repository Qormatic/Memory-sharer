import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

// in commentSection below we loop through all comments using .map - "comments?.map((c, i) => (" "c" stands for comments and "i" for index
//...for each comment we return a typography
// textfield is our text input. We track it's value in "comment" state variable

// functional react component
const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  // set initial state of comments equal to the comments initially attached to the post
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  // create "commentsRef" reference which we will hook on to a specific element
  // we use it as an anchor point in a div below so comments will auto scroll to newest comment
  // and logic is this "commentsRef.current.scrollIntoView({ behavior: 'smooth' });"

  const commentsRef = useRef();

  const handleComment = async () => {
	  // get user name who wrote comment ${user?.result?.name}, then the comment ${comment} from the state and the post ID post._id
	  // awaiting the dispatch action here means we won't have to reload browser to see a new comment
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
	  
	// setComment('') returns the state of setComment to empty string ready for next comment
    setComment('');
	 // By setting newComments(setComments) we render all the comments in the FE at the same time including the new one so no page refresh
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // "<strong>{c.split(': ')[0]}</strong>" splits a username ".split(': ')[0]" from the comment at point ":" and "</strong>" makes bold
  // "c.split(':')[1]" is the actual comment
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;