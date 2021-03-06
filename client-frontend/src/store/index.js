import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';

const middleware = [thunk, createLogger()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const index = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default index;
