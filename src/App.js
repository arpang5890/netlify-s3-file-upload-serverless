import React from 'react';
import Home from './home/Home';
import netlifyIdentity from 'netlify-identity-widget';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import './App.css';

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <Link to="/home" className="mainPage"><h5 className="headerText">Upload Files</h5></Link>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </div>
    </Router>
  );
}

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    netlifyAuth.isAuthenticated ? (
      <div className='header'>
        <button
          onClick={() => {
            netlifyAuth.signout(() => history.push('/'));
          }}
        >
          Sign out
        </button>
      </div>
    ) : (<p></p>)
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        netlifyAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="loginbutton">
        <button className="button" onClick={this.login}>Log in</button>
      </div>
    );
  }
}
export default AuthExample;