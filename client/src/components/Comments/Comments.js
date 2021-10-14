import { Typography, Grid, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import Comment from './Comment';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Comments(props) {
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [flag, setFlag] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');

  function handleCommentSubmit(e) {
    e.preventDefault();
    const data = {
      id: location.state._id,
      name: e.target.commentName.value,
      comment: e.target.commentInput.value,
    };

    axios
      .post('/api/blog/addComment', data)
      .then((res) => {
        e.target.value = '';
      })
      .catch((err) => {});
    setFlag(!flag);
  }
  useEffect(() => {
    axios.get(`/api/blog/getComments/${props.blogId}`).then((res) => {
      setComments(res.data);
      setCommentName('');
      setCommentText('');
    });
  }, [flag]);

  return (
    <div className="Comments">
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Comments ({comments.length})</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">Add your comment</Typography>
          <form
            className="commentForm"
            onSubmit={(e) => handleCommentSubmit(e)}
          >
            <TextField
              name="commentName"
              variant="outlined"
              required
              fullWidth
              label="Your Name"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
            />
            <br />
            <br />
            <TextField
              name="commentInput"
              variant="outlined"
              required
              fullWidth
              label="Type Comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ float: 'right', margin: '5px' }}
            >
              Comment
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Comment comments={comments} />
        </Grid>
      </Grid>
    </div>
  );
}
