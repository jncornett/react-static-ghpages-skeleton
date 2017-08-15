import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome-webpack';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './style.css';

import App from './app.jsx';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./app.jsx', () => { render(App) });
}
