import React from 'react';
//import ReactDOM from 'react-dom';

import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// ReactDOM.render(<App />, document.getElementById('root'));

// After
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.register();
serviceWorkerRegistration.register();