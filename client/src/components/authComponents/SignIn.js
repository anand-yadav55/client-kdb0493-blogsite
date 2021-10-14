import { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import auth from '../../service/checkAuth';
import back3 from '../../assets/back3.jpg';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${back3})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '10px',

    marginTop: '20px',
    padding: '20px',
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [logged, setLogged] = useState(false);

  function onSubmitForm(e) {
    e.preventDefault();
    if (e.target.email.value && e.target.password.value) {
      let creds = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      axios
        .post('/api/user/login', creds)
        .then((res) => {
          if (res.data.user && res.status == 200) {
            localStorage.setItem('token', res.data.user.token);
            console.log(res.data);
            const token = localStorage.getItem('token');
            props.setIsAuthenticated(auth('checkAuth', token).isAuthenticated);
            history.push('/');
          } else {
            props.setAlertMessage(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          // props.setAlertMessage(err.msg);
        });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    setLogged(auth('checkAuth', '').isAuthenticated);

    if (logged) {
      history.push('/');
    }
  }, [logged]);
  const history = useHistory();
  const classes = useStyles();

  if (logged) {
    return <Redirect to="/" />;
  }
  return logged ? (
    <h1>Already logged</h1>
  ) : (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            method="POST"
            onSubmit={(e) => {
              onSubmitForm(e);
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
