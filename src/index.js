import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Reducer from './redux/index'
import App from './App';
import './index.css';
import 'antd/dist/antd.css';

import * as serviceWorker from './serviceWorker';

const reduxMiddleware = [ thunk ];
const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...reduxMiddleware));

ReactDOM.render((<Provider store={store}><App author="tmy" /></Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
