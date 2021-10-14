import Footer from './components/Footer';
import Header from './components/Header';

import { Route, Switch, Link } from 'react-router-dom';

import auth from './service/checkAuth';

import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Container } from '@material-ui/core';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import SignIn from './components/authComponents/SignIn';
import SignUp from './components/authComponents/SignUp';
import CreateBlog from './components/CreateBlog';
import ViewBlog from './components/ViewBlog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: 'sticky',
    bottom: '0',
    width: '30%',
  },
}));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    setIsAuthenticated(
      auth('checkAuth', localStorage.getItem('token')).isAuthenticated
    );
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setAlertMessage(null);
    }, 8000);
  }, [alertMessage]);
  return (
    <Container className="App" fixed>
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setAlertMessage={setAlertMessage}
      />

      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Home
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
          />
        </Route>

        <Route path="/login" exact>
          <SignIn
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            setAlertMessage={setAlertMessage}
          />
        </Route>
        <Route path="/signup" exact>
          <SignUp
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            setAlertMessage={setAlertMessage}
          />
        </Route>
        <Route path="/createBlog" exact>
          <CreateBlog
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            setAlertMessage={setAlertMessage}
          />
        </Route>

        <Route path="/view-blog/:id">
          <ViewBlog
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            setAlertMessage={setAlertMessage}
          />
        </Route>
        <Route>
          <h1>
            You are LOST. click here to go to <Link to="/">Home</Link>
          </h1>
        </Route>
      </Switch>
      <Footer />
      <div
        style={{
          height: '15vh',
          width: '100%',

          background: 'linear-gradient(to right, #2bc0e4, #eaecc6)',
        }}
      ></div>
      <div className={classes.root}>
        {alertMessage ? (
          <Alert
            severity="info"
            onClose={() => {
              setAlertMessage(null);
            }}
          >
            {alertMessage}
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}

export default App;
