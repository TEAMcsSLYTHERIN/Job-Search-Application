import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import { CookiesProvider } from 'react-cookie';
import { HashRouter } from 'react-router-dom';

const Root = ({ store }) => (
  <CookiesProvider>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </CookiesProvider>
);

export default Root;