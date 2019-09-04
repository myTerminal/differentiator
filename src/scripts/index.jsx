/* global require document */

import React from 'react';
import { render } from 'react-dom';

import '../styles/styles.less';

import './pwa';

import App from './app.jsx';

render(
    <App />,
    document.getElementById('page')
);

if (module.hot) {
    module.hot.accept();
}
