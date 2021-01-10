import React from 'react';
import ReactDom from 'react-dom';
import Sign from '../Sign/Signs';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, applyMiddleware(thunk));

it('Sign in Page renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
        <Provider store={store}>
            <Router>
                <Sign />
            </Router>
        </Provider>,
        div
    );
});
