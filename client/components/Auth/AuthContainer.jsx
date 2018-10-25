import React, { Component } from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import * as actions from '../../actions/actionCreators'
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { CookiesProvider, withCookies} from 'react-cookie';


const mapStateToProps = store => ({
  ...store.jobSearch
})

const mapDispatchToProps = dispatch => ({
  setLoggedIn: callback => {
    dispatch(actions.setLoggedIn())
    callback();
  }
})

class AuthContainer extends Component {

  responseGoogle(response) {
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${response.tokenId}`
      }})
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

  render(){
    const { isLoggedIn, setLoggedIn } = this.props;
    return (
      <div>
        
        <Auth
          isLoggedIn={isLoggedIn} 
          setLoggedIn={setLoggedIn}
          cookies={this.props.allCookies}
        />
      </div>
    )
  }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(AuthContainer));
