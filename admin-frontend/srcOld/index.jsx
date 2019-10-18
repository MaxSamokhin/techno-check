import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './assets/style/main.less';

import {Provider} from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

import store from './store';
import App from './app.jsx';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
