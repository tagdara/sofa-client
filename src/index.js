import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sofa from './Sofa';
import "typeface-roboto";

//import * as serviceWorker from './serviceWorker';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(<Sofa />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.register();
serviceWorkerRegistration.register();