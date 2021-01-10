import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthorization from './config/setAuthorization';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergerLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

setAuthorization(localStorage.userToken);
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergerLevel2
};

const persistedReducer = persistReducer(persistConfig, reducer);

/* const store = createStore(reducer, applyMiddleware(thunk)); */

let store = createStore(persistedReducer, applyMiddleware(thunk));
persistStore(store);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
