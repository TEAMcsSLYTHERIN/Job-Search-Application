import React from 'react';
import { Provider, connect } from 'react-redux';
import { Component } from 'react';
import App from './components/App';
import { CookiesProvider, withCookies} from 'react-cookie';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import JobForm from './components/JobForms/JobForm';
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
    return (
    <CookiesProvider>
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => !this.props.allCookies.authorized ? ( 
              <AuthContainer cookies={this.props.allCookies.authorized} /> 
              ) : (
              <Redirect to="/dashboard" />
            )} />
            <Route exact path="/dashboard" render={() => this.props.allCookies.authorized ? ( 
              <DashboardContainer cookies={this.props.allCookies.authorized} /> 
              ) : (
              <Redirect to="/" />
            )} />
            <Route exact path="/form" render={() => this.props.allCookies.authorized ? ( 
              <JobForm cookies={this.props.allCookies.authorized} /> 
              ) : (
              <Redirect to="/" />
            )} />
          </Switch>
        </HashRouter>
      </Provider>
    </CookiesProvider>
    )
  }
}

export default withCookies(connect(mapStateToProps)(Root));
