import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { tokenLogin } from './actions/authentication';
import { history } from './Router';

// Handle view routes
import Router from './Router';

// All app styles
require('./styles/index.scss');

// Create a new store and apply thunkMiddleware for async requests
const store: Store<any> = applyMiddleware(thunkMiddleware, routerMiddleware(history))(createStore)(reducers);

// Element where to render the react application
const rootElement = document.getElementById('root');

// Render react routes and wrap with a provider to allow children to access the store
render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    rootElement
);

// Login via token for returning users
store.dispatch(tokenLogin());
