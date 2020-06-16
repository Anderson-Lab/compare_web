import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./Main";



import * as serviceWorker from './serviceWorker';
// Import global styles accross entire application
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap
import './index.css'; // Our own main stylesheet


const router = <Main />;

ReactDOM.render(router, document.getElementById('root'));
serviceWorker.unregister();
