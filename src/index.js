import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Category from './Category' 

ReactDOM.render(
    <Category/>,document.getElementById('root')
);


serviceWorker.unregister();
