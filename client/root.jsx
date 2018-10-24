import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { CookiesProvider } from 'react-cookie';

const Root = ({ store }) => (
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <Route path='/:filter?' component={App} />
      </Router>
    </Provider>
  </CookiesProvider>
);

export default Root;