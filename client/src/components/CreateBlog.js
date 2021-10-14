import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import auth from '../service/checkAuth';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#487346',
    backgroundImage: `url(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%234c8e43' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%236aac5f' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%234c8e43' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%236aac5f' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%2389CC7C' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%23768c3a' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%2396ac58' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%2396ac58' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%23768c3a' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%23768c3a' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%2396ac58' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E"
    )`,
    marginTop: '2rem',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function createBlog(props) {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogBody, setBlogBody] = useState('');
  const [msg, setMsg] = useState(null);

  const history = useHistory();
  function handleFormSubmit(e) {
    e.preventDefault();

    if (!auth('checkAuth', '').isAuthenticated) {
      // props.setAlertMessage('You need to Login first');
      return;
    }
    const data = {
      userId: localStorage.getItem('token'),
      blogTitle: e.target.blogTitle.value,
      blogBody: e.target.blogBody.value,
    };
    axios.post('/api/blog/createBlog', data).then((doc) => {
      setBlogBody('');
      setBlogTitle('');

      history.push('/');
    });
  }
  const classes = useStyles();

  return props.isAuthenticated ? (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        component={Paper}
        elevation={6}
        square
        style={{ width: '70%', marginTop: '20px' }}
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Write your Blog
          </Typography>
          <Avatar className={classes.avatar}>
            <CreateOutlinedIcon />
          </Avatar>

          <form className={classes.form} onSubmit={(e) => handleFormSubmit(e)}>
            <TextField
              name="blogTitle"
              variant="outlined"
              fullWidth
              required
              autoFocus
              label="Title"
              value={blogTitle}
              onChange={(e) => {
                setBlogTitle(e.target.value);
              }}
              noValidate
            />
            <br />
            <br />
            <TextField
              autoComplete="blogBody"
              variant="outlined"
              fullWidth
              required
              multiline={true}
              rows={10}
              label="Body"
              name="blogBody"
              value={blogBody}
              onChange={(e) => {
                setBlogBody(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/login" />
  );
}
