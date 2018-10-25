import React, { Component } from 'react';
import { debug } from 'util';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { withCookies } from 'react-cookie';

class App extends Component {
    
  responseGoogle(response) {
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${response.tokenId}`
      }
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

  render(){
    return (
      <div> 
        <GoogleLogin
          onClick={() => {this.onSignIn}}
          clientId='785379560416-oee86k0flmbp00qkc52mcvaoqs6g307a.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={this.responseGoogle}
          onFailure={this.handleFail}
        />

        <GoogleLogout
          buttonText='Logout'
          onLogoutSuccess={this.signOut}
        />
        <div className='container'>Hello World</div>
      </div>
    );
  }
}
export default withCookies(App);