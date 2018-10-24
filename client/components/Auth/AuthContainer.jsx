import React, { Component } from 'react';
import Auth from './Auth';
import {connect} from 'react-redux';
import * as actions from '../../actions/actionCreators'

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
  render(){
    console.log(this.props.history)
    const { isLoggedIn, setLoggedIn } = this.props;
    return (
      <Auth
        isLoggedIn={isLoggedIn} 
        setLoggedIn={setLoggedIn}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);