import auth from '../service/checkAuth';
import { useHistory } from 'react-router';
import logo from '../assets/logo.jpg';
import { Button } from '@material-ui/core';
import './header.css';

export default function Header(props) {
  const history = useHistory();
  return (
    <header>
      <span className="logo">
        <img
          src={logo}
          onClick={() => history.push('/')}
          style={{ cursor: 'pointer' }}
        />
      </span>

      <span className="control-btn">
        {props.isAuthenticated ? (
          <Button
            className="btn"
            variant="contained"
            color="secondary"
            onClick={() => {
              auth('logout', '').isAuthenticated;
              props.setIsAuthenticated(false);
              props.setAlertMessage('Logged Out');
              // history.push('/');
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="btn"
            variant="contained"
            color="primary"
            onClick={() => history.push('/login')}
            // style={{ boxShadow: '10px 10px 10px black' }}
          >
            Sign in
          </Button>
        )}
      </span>
    </header>
  );
}
