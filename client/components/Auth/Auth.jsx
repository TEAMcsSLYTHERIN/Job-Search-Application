import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/Lock';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import store from '../../store';
import * as types from '../../actions/actionCreators';
import AuthButton from './AuthButton';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { CookiesProvider, withCookies} from 'react-cookie';
import { query } from 'wasp-graphql';

// import GraphQL Queries
import * as queries from '../../queries/queries';

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Auth extends Component {
  constructor(props) {
    super(props)

  }

  responseGoogle(response, props) {
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${response.tokenId}`
      }
    }).then(res => {
      query('http://localhost:3000/graphql', queries.allUserData)
      .then(res => {
        return res.json()
      }).then(resp => {
        store.dispatch(types.updateUserInformation(resp))
      })
    })
  }

  handleFail(e) {
    console.log('in failure', e);
  }

  signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(res => {
      console.log('User signed out.', res);
    });
  }

render() {
  const { cookies } = this.props;
  if(cookies.get('authorized')) {
    cookies.remove('authorized');
    cookies.set('userId', this.props.state.jobSearch.id, '/')
  }
  console.log(this.props)
  return (
      <React.Fragment>
        <CssBaseline />
        <main className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={this.props.classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <AuthButton 
                isLoggedIn={this.props.isLoggedIn} 
                setLoggedIn={this.props.setLoggedIn} 
                classes={this.props.classes} 
              />
              <GoogleLogin
                onClick={() => {this.onSignIn}}
                clientId='785379560416-oee86k0flmbp00qkc52mcvaoqs6g307a.apps.googleusercontent.com'
                buttonText='Login'
                onSuccess={this.responseGoogle}
                onFailure={this.handleFail}
            />
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withCookies(connect(mapStateToProps)(withStyles(styles)(Auth)));
