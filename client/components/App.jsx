import React, { Component } from 'react';
import AuthContainer from './Auth/AuthContainer'
import DashboardContainer from './Dashboard/DashboardContainer';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={AuthContainer} />
        <Route exact path="/dashboard" component={DashboardContainer} />
      </div>
    );
  }
};

export default App;