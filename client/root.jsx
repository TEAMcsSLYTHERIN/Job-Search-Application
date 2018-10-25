import React from 'react';
import { Provider, connect } from 'react-redux';
import { Component } from 'react';
import App from './components/App';
import { CookiesProvider, withCookies} from 'react-cookie';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import AuthContainer from './components/Auth/AuthContainer';
import store from './store';

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body;

    if(this.props.allCookies.authorized === 'yes') {
      body = <Route render={() => (<DashboardContainer cookies={this.props.allCookies.authorized}/>)} />
    } else {
      body = <Route render={() => (<AuthContainer cookies={this.props.allCookies.authorized}/>)} />
    }
    return (
    <CookiesProvider>
      <Provider store={store}>
        <HashRouter>
          <div>
            {body}
          </div>
        </HashRouter>
      </Provider>
    </CookiesProvider>
    )
  }
}

export default withCookies(connect(mapStateToProps)(Root));
